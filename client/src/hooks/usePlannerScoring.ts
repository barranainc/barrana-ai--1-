import { useMemo } from 'react';
import type { PlannerState, PlannerResults, Opportunity, WorkflowId } from '@/types/planner';
import { SCORING_WEIGHTS, WORKFLOW_BASE_SCORES, PAIN_AMPLIFIERS, TEAM_SIZE_COMPLEXITY, classifyOpportunity } from '@/config/planner/scoring';
import { RECOMMENDATION_MAP } from '@/config/planner/recommendations';
import { INDUSTRY_MAP } from '@/config/planner/industries';
import { PAIN_POINT_MAP } from '@/config/planner/painPoints';
import { HUMAN_REQUIRED_OPTIONS } from '@/config/planner/humanRequired';
import { TOOLS } from '@/config/planner/tools';

function applyIndustryTerms(text: string, industry: string): string {
  const def = INDUSTRY_MAP[industry];
  if (!def) return text;
  const { terms } = def;
  return text
    .replace(/\bclient\b/gi, terms.client)
    .replace(/\benquiry\b/gi, terms.enquiry)
    .replace(/\bappointment\b/gi, terms.appointment)
    .replace(/\bfile\b/gi, terms.file)
    .replace(/\bintake\b/gi, terms.intake)
    .replace(/\bstaff\b/gi, terms.staff);
}

export function usePlannerScoring(state: PlannerState): PlannerResults | null {
  return useMemo(() => {
    // Only compute when wizard is complete
    if (state.currentStep < 9) return null;

    const industry = state.industry ?? 'professional-other';
    const industryDef = INDUSTRY_MAP[industry];

    // Compute avg tool compatibility
    const selectedToolDefs = TOOLS.filter(t => state.tools.includes(t.id));
    const avgToolScore = selectedToolDefs.length > 0
      ? selectedToolDefs.reduce((sum, t) => sum + t.compatibilityScore, 0) / selectedToolDefs.length
      : 3;

    // Team size complexity
    const teamComplexity = TEAM_SIZE_COMPLEXITY[state.teamSize ?? '2 to 5'] ?? 1.0;

    // Score each selected workflow
    const scored: Opportunity[] = state.selectedWorkflows.map(workflowId => {
      const bases = WORKFLOW_BASE_SCORES[workflowId];
      if (!bases) return null;

      let [painSeverity, frequency, standardisation, toolComp, humanSensitivity, quickWin] = bases;

      // Apply pain amplifiers
      state.painPoints.forEach(pp => {
        const amplifiers = PAIN_AMPLIFIERS[pp] ?? {};
        if (amplifiers[workflowId]) {
          painSeverity = Math.min(5, painSeverity + amplifiers[workflowId]!);
        }
      });

      // Adjust for actual tools selected
      toolComp = Math.min(5, (toolComp + avgToolScore) / 2);

      // Reduce human sensitivity if human-required options apply
      const humanOpts = HUMAN_REQUIRED_OPTIONS.filter(h =>
        state.humanRequired.includes(h.id) && h.relatedWorkflows.includes(workflowId)
      );
      if (humanOpts.length > 0) {
        humanSensitivity = Math.max(1, humanSensitivity - humanOpts.length * 0.8);
      }

      // Compute weighted composite score
      const score = (
        painSeverity * SCORING_WEIGHTS.painSeverity +
        frequency * SCORING_WEIGHTS.frequency +
        standardisation * SCORING_WEIGHTS.standardisation +
        toolComp * SCORING_WEIGHTS.toolCompatibility +
        humanSensitivity * SCORING_WEIGHTS.humanSensitivity +
        quickWin * SCORING_WEIGHTS.quickWinPotential
      );

      const classification = classifyOpportunity(score);
      const phase: 1 | 2 | 3 = score >= 4.0 ? 1 : score >= 3.0 ? 2 : 3;

      const template = RECOMMENDATION_MAP[workflowId];
      const hasHumanGate = humanOpts.length > 0;

      const toolsInvolved = selectedToolDefs
        .filter(t => ['CRM', 'Scheduling', 'Accounting', 'Legal', 'Healthcare', 'Field Service'].includes(t.category))
        .map(t => t.label)
        .slice(0, 2);

      const name = applyIndustryTerms(template.name, industry);
      const description = applyIndustryTerms(template.description, industry) + (hasHumanGate ? ' Human approval gates built in for sensitive steps.' : '');

      return {
        id: workflowId,
        workflowId,
        name,
        description,
        classification,
        phase,
        score: Math.round(score * 10) / 10,
        estimatedImpact: template.estimatedImpact,
        toolsInvolved,
        hasHumanGate,
      } as Opportunity;
    }).filter(Boolean) as Opportunity[];

    // Sort by score desc
    scored.sort((a, b) => b.score - a.score);

    // Roadmap split
    const roadmap = {
      phase1: scored.filter(o => o.phase === 1),
      phase2: scored.filter(o => o.phase === 2),
      phase3: scored.filter(o => o.phase === 3),
    };

    // Complexity
    const avgScore = scored.reduce((s, o) => s + o.score, 0) / Math.max(scored.length, 1);
    const complexity: 'low' | 'medium' | 'high' =
      teamComplexity > 1.3 || avgToolScore < 2 ? 'high'
      : avgScore >= 3.5 && avgToolScore >= 4 ? 'low'
      : 'medium';

    // Human-led items
    const humanLedItems = state.humanRequired.map(hrId => {
      const def = HUMAN_REQUIRED_OPTIONS.find(h => h.id === hrId);
      return { label: def?.label ?? hrId, explanation: def?.impactDescription ?? '' };
    });

    // Benefits estimation
    const adminHours = state.volume.adminHoursPerWeek ?? 10;
    const adminLow = Math.round(adminHours * 0.4);
    const adminHigh = Math.round(adminHours * 0.6);

    const painLabels = state.painPoints.map(pp => PAIN_POINT_MAP[pp]?.label ?? pp).join(', ');
    const workflowNames = scored.slice(0, 3).map(o => o.name).join(', ');
    const toolNames = selectedToolDefs.map(t => t.label).join(', ') || 'your current tools';

    const summaryText = `Your ${industryDef?.label ?? 'business'} ${state.teamSize ? `with a team of ${state.teamSize}` : ''} handles approximately ${state.volume.enquiriesPerWeek ?? 'a number of'} enquiries per week. Your biggest operational bottlenecks are ${painLabels || 'admin and follow-up'}. You currently use ${toolNames}. Several of your workflows — particularly ${workflowNames} — have strong automation potential.`;

    return {
      summaryText,
      opportunities: scored,
      humanLedItems,
      suggestedStart: roadmap.phase1[0] ?? scored[0] ?? null,
      complexity,
      roadmap,
      benefits: {
        adminHoursRecoverable: `${adminLow}–${adminHigh} hours per week`,
        responseImprovement: 'Current response time to under 5 minutes',
        followUpImprovement: 'Current follow-up rate to 100%',
        capacityImprovement: '20–30% additional capacity with the same team',
      },
    };
  }, [state]);
}
