export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentCategory = 'bias' | 'misinformation' | 'privacy' | 'security' | 'harmful-content' | 'system-manipulation' | 'other';
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  date: string;
  severity: IncidentSeverity;
  category: IncidentCategory;
  status: IncidentStatus;
  affectedSystems: string[];
  reportedBy: string;
  location?: string;
  impact?: string;
  mitigation?: string;
  created: string;
  updated: string;
}

export interface IncidentFilters {
  search: string;
  severity: IncidentSeverity | '';
  category: IncidentCategory | '';
  status: IncidentStatus | '';
  sortBy: 'date' | 'severity' | 'title';
  sortDirection: 'asc' | 'desc';
}