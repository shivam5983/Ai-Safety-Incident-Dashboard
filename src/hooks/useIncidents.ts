import { useState, useEffect, useMemo } from 'react';
import { Incident, IncidentFilters } from '../types/incident';
import { mockIncidents } from '../data/mockIncidents';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filters, setFilters] = useState<IncidentFilters>({
    search: '',
    severity: '',
    category: '',
    status: '',
    sortBy: 'date',
    sortDirection: 'desc',
  });

  useEffect(() => {
    // Initialize with mock data on first load
    setIncidents(mockIncidents);
  }, []);

  const addIncident = (incident: Omit<Incident, 'id' | 'created' | 'updated'>) => {
    const now = new Date().toISOString();
    const newIncident: Incident = {
      ...incident,
      id: generateId(),
      created: now,
      updated: now,
    };
    
    setIncidents(prev => [newIncident, ...prev]);
    return newIncident;
  };

  const updateIncident = (updatedIncident: Incident) => {
    const now = new Date().toISOString();
    const updated = {
      ...updatedIncident,
      updated: now,
    };
    
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === updated.id ? updated : incident
      )
    );
    return updated;
  };

  const deleteIncident = (id: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== id));
  };

  const updateFilters = (newFilters: Partial<IncidentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredIncidents = useMemo(() => {
    return incidents
      .filter(incident => {
        const matchesSearch = filters.search === '' ||
          incident.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          incident.description.toLowerCase().includes(filters.search.toLowerCase());
          
        const matchesSeverity = filters.severity === '' || incident.severity === filters.severity;
        const matchesCategory = filters.category === '' || incident.category === filters.category;
        const matchesStatus = filters.status === '' || incident.status === filters.status;
        
        return matchesSearch && matchesSeverity && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date') {
          return filters.sortDirection === 'asc' 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        
        if (filters.sortBy === 'severity') {
          const severityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
          return filters.sortDirection === 'asc'
            ? severityOrder[a.severity] - severityOrder[b.severity]
            : severityOrder[b.severity] - severityOrder[a.severity];
        }
        
        if (filters.sortBy === 'title') {
          return filters.sortDirection === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        
        return 0;
      });
  }, [incidents, filters]);

  return {
    incidents: filteredIncidents,
    allIncidents: incidents,
    addIncident,
    updateIncident,
    deleteIncident,
    filters,
    updateFilters
  };
}