import React, { useState } from 'react';
import Header from './components/layout/Header';
import PageTitle from './components/layout/PageTitle';
import FilterBar from './components/dashboard/FilterBar';
import IncidentList from './components/incidents/IncidentList';
import IncidentDetail from './components/incidents/IncidentDetail';
import IncidentForm from './components/incidents/IncidentForm';
import IncidentStats from './components/dashboard/IncidentStats';
import IncidentDistributionChart from './components/dashboard/IncidentDistributionChart';
import { Incident } from './types/incident';
import { useIncidents } from './hooks/useIncidents';

function App() {
  const { 
    incidents, 
    allIncidents,
    addIncident, 
    updateIncident, 
    filters, 
    updateFilters 
  } = useIncidents();
  
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleCloseDetail = () => {
    setSelectedIncident(null);
  };

  const handleAddIncident = () => {
    setIsFormOpen(true);
  };

  const handleSubmitIncident = (incident: Omit<Incident, 'id' | 'created' | 'updated'>) => {
    addIncident(incident);
    setIsFormOpen(false);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageTitle 
          title="AI Safety Incident Dashboard" 
          subtitle="Monitor, track, and respond to AI safety incidents across all systems"
        />
        
        <IncidentStats incidents={allIncidents} />
        
        <IncidentDistributionChart incidents={allIncidents} />
        
        <FilterBar 
          filters={filters}
          onFiltersChange={updateFilters}
          onAddIncident={handleAddIncident}
        />
        
        <IncidentList 
          incidents={incidents}
          onSelectIncident={handleSelectIncident}
        />
      </main>

      {selectedIncident && (
        <IncidentDetail 
          incident={selectedIncident} 
          onClose={handleCloseDetail}
        />
      )}
      
      {isFormOpen && (
        <IncidentForm 
          onSubmit={handleSubmitIncident}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}

export default App;