import React from 'react';
import { Incident } from '../../types/incident';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDate, getSeverityColor, getStatusColor, getCategoryColor } from '../../utils/formatters';
import { X } from 'lucide-react';

interface IncidentDetailProps {
  incident: Incident;
  onClose: () => void;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Incident Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 flex-grow">{incident.title}</h1>
              <Badge 
                label={incident.severity} 
                className={`${getSeverityColor(incident.severity)}`} 
              />
            </div>
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Date Occurred</h3>
              <p className="text-base text-gray-900">{formatDate(incident.date)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Reported By</h3>
              <p className="text-base text-gray-900">{incident.reportedBy}</p>
            </div>
            {incident.location && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                <p className="text-base text-gray-900">{incident.location}</p>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-base text-gray-900 whitespace-pre-line">{incident.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Affected Systems</h3>
            <div className="flex flex-wrap gap-2">
              {incident.affectedSystems.map((system, index) => (
                <Badge 
                  key={index} 
                  label={system} 
                  className="bg-gray-100 text-gray-800" 
                />
              ))}
            </div>
          </div>
          
          {incident.impact && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Impact</h3>
              <p className="text-base text-gray-900">{incident.impact}</p>
            </div>
          )}
          
          {incident.mitigation && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Mitigation</h3>
              <p className="text-base text-gray-900">{incident.mitigation}</p>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex justify-between text-sm text-gray-500">
              <div>Created: {formatDate(incident.created)}</div>
              <div>Last updated: {formatDate(incident.updated)}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;