import React from 'react';
import { Incident } from '../../types/incident';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { formatDate, getSeverityColor, getStatusColor, getCategoryColor } from '../../utils/formatters';

interface IncidentCardProps {
  incident: Incident;
  onClick: (incident: Incident) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onClick }) => {
  return (
    <Card 
      className="hover:border-blue-300 transition-all duration-200 h-full"
      onClick={() => onClick(incident)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{incident.title}</h3>
          <Badge 
            label={incident.severity} 
            className={`ml-2 ${getSeverityColor(incident.severity)}`} 
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{incident.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            label={incident.category.replace('-', ' ')} 
            className={getCategoryColor(incident.category)} 
          />
          <Badge 
            label={incident.status} 
            className={getStatusColor(incident.status)} 
          />
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Reported by: {incident.reportedBy}</span>
          <span>{formatDate(incident.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default IncidentCard;