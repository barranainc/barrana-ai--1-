import type { ToolDefinition } from '@/types/planner';

export const TOOLS: ToolDefinition[] = [
  { id: 'google-workspace', label: 'Google Workspace (Gmail, Calendar, Drive)', compatibilityScore: 5, category: 'Productivity' },
  { id: 'microsoft-365', label: 'Microsoft 365 (Outlook, Teams)', compatibilityScore: 5, category: 'Productivity' },
  { id: 'quickbooks', label: 'QuickBooks / Xero / FreshBooks', compatibilityScore: 5, category: 'Accounting' },
  { id: 'hubspot', label: 'HubSpot', compatibilityScore: 5, category: 'CRM' },
  { id: 'go-high-level', label: 'Go High Level', compatibilityScore: 5, category: 'CRM' },
  { id: 'zoho', label: 'Zoho', compatibilityScore: 4, category: 'CRM' },
  { id: 'monday-asana-clickup', label: 'Monday.com / Asana / ClickUp', compatibilityScore: 5, category: 'Project Management' },
  { id: 'jobber', label: 'Jobber', compatibilityScore: 4, category: 'Field Service' },
  { id: 'clio', label: 'Clio', compatibilityScore: 4, category: 'Legal' },
  { id: 'jane-cliniko', label: 'Jane App / Cliniko', compatibilityScore: 4, category: 'Healthcare' },
  { id: 'calendly-acuity', label: 'Calendly / Acuity', compatibilityScore: 5, category: 'Scheduling' },
  { id: 'stripe', label: 'Stripe', compatibilityScore: 5, category: 'Payments' },
  { id: 'shopify', label: 'Shopify', compatibilityScore: 5, category: 'E-commerce' },
  { id: 'whatsapp', label: 'WhatsApp (for business communication)', compatibilityScore: 3, category: 'Communication' },
  { id: 'custom-crm', label: 'Custom CRM', compatibilityScore: 3, category: 'CRM' },
  { id: 'spreadsheets', label: 'Spreadsheets (Google Sheets, Excel)', compatibilityScore: 3, category: 'Manual' },
  { id: 'mostly-manual', label: 'Mostly manual / paper-based', compatibilityScore: 1, category: 'Manual' },
];
