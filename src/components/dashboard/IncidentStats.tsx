import React, { useMemo } from 'react';
import { Incident } from '../../types/incident';
import Card from '../ui/Card';
import { AlertTriangle, Shield, Clock } from 'lucide-react';

interface IncidentStatsProps {
  incidents: Incident[];
}

const IncidentStats: React.FC<IncidentStatsProps> = ({ incidents }) => {
  const stats = useMemo(() => {
    const totalIncidents = incidents.length;
    
    const severityCounts = incidents.reduce((acc, incident) => {
      acc[incident.severity] = (acc[incident.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const statusCounts = incidents.reduce((acc, incident) => {
      acc[incident.status] = (acc[incident.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const openIncidents = statusCounts.open || 0;
    const investigatingIncidents = statusCounts.investigating || 0;
    const criticalIncidents = severityCounts.critical || 0;
    const highIncidents = severityCounts.high || 0;
    
    return {
      totalIncidents,
      openIncidents,
      investigatingIncidents,
      criticalIncidents,
      highIncidents,
      activeIncidents: openIncidents + investigatingIncidents,
      highPriorityIncidents: criticalIncidents + highIncidents,
    };
  }, [incidents]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="bg-red-200 rounded-full p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">High Priority</p>
              <h3 className="text-2xl font-bold text-red-900">{stats.highPriorityIncidents}</h3>
              <p className="text-xs text-red-700 mt-1">
                Critical: {stats.criticalIncidents} | High: {stats.highIncidents}
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="bg-blue-200 rounded-full p-3 mr-4">
              <Clock className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Active Incidents</p>
              <h3 className="text-2xl font-bold text-blue-900">{stats.activeIncidents}</h3>
              <p className="text-xs text-blue-700 mt-1">
                Open: {stats.openIncidents} | Investigating: {stats.investigatingIncidents}
              </p>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div className="p-5">
          <div className="flex items-center">
            <div className="bg-green-200 rounded-full p-3 mr-4">
              <Shield className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Total Incidents</p>
              <h3 className="text-2xl font-bold text-green-900">{stats.totalIncidents}</h3>
              <p className="text-xs text-green-700 mt-1">
                All time logged incidents
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IncidentStats;