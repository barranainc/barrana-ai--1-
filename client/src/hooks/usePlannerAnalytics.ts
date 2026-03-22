import { useCallback } from 'react';

type EventName =
  | 'planner_started'
  | 'planner_step_viewed'
  | 'planner_step_completed'
  | 'planner_completed'
  | 'planner_result_viewed'
  | 'planner_lead_submitted'
  | 'planner_cta_clicked'
  | 'planner_abandoned';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function usePlannerAnalytics() {
  const track = useCallback((event: EventName, params?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event, params);
      }
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event, ...params });
      }
    } catch {
      // Analytics should never break the app
    }
  }, []);

  return {
    trackStarted: () => track('planner_started'),
    trackStepViewed: (step: number, stepName: string) => track('planner_step_viewed', { step, stepName }),
    trackStepCompleted: (step: number, stepName: string, selections?: unknown) => track('planner_step_completed', { step, stepName, selections }),
    trackCompleted: (industry: string, teamSize: string, workflowCount: number, readiness: string) =>
      track('planner_completed', { industry, teamSize, workflowCount, readiness }),
    trackResultViewed: (topOpportunity: string, classification: string) =>
      track('planner_result_viewed', { topOpportunity, classification }),
    trackLeadSubmitted: (email: string, industry: string, readiness: string) =>
      track('planner_lead_submitted', { email, industry, readiness }),
    trackCTAClicked: (ctaType: 'automation-map' | 'strategy-call' | 'share-results') =>
      track('planner_cta_clicked', { ctaType }),
    trackAbandoned: (lastStep: number, stepName: string) =>
      track('planner_abandoned', { lastStep, stepName }),
  };
}
