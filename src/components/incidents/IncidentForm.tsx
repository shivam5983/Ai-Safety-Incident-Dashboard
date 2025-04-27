import React, { useState } from 'react';
import { Incident, IncidentSeverity, IncidentCategory, IncidentStatus } from '../../types/incident';
import Button from '../ui/Button';
import { X, Plus, Save } from 'lucide-react';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'created' | 'updated'>) => void;
  onCancel: () => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [severity, setSeverity] = useState<IncidentSeverity>('medium');
  const [category, setCategory] = useState<IncidentCategory>('other');
  const [status, setStatus] = useState<IncidentStatus>('open');
  const [reportedBy, setReportedBy] = useState('');
  const [location, setLocation] = useState('');
  const [impact, setImpact] = useState('');
  const [mitigation, setMitigation] = useState('');
  const [systemInput, setSystemInput] = useState('');
  const [affectedSystems, setAffectedSystems] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Date is required';
    if (!reportedBy.trim()) newErrors.reportedBy = 'Reporter name is required';
    if (affectedSystems.length === 0) newErrors.affectedSystems = 'At least one affected system is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSubmit({
      title,
      description,
      date: new Date(date).toISOString(),
      severity,
      category,
      status,
      reportedBy,
      location,
      impact,
      mitigation,
      affectedSystems,
    });
  };

  const addSystem = () => {
    if (systemInput.trim() && !affectedSystems.includes(systemInput.trim())) {
      setAffectedSystems([...affectedSystems, systemInput.trim()]);
      setSystemInput('');
    }
  };

  const removeSystem = (system: string) => {
    setAffectedSystems(affectedSystems.filter(s => s !== system));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Report New Incident</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief title describing the incident"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Detailed description of what happened"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date Occurred <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            
            <div>
              <label htmlFor="reportedBy" className="block text-sm font-medium text-gray-700 mb-1">
                Reported By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="reportedBy"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name or role of the reporter"
              />
              {errors.reportedBy && <p className="mt-1 text-sm text-red-600">{errors.reportedBy}</p>}
            </div>
            
            <div>
              <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                Severity
              </label>
              <select
                id="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="bias">Bias</option>
                <option value="misinformation">Misinformation</option>
                <option value="privacy">Privacy</option>
                <option value="security">Security</option>
                <option value="harmful-content">Harmful Content</option>
                <option value="system-manipulation">System Manipulation</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as IncidentStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Where the incident occurred"
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="affectedSystems" className="block text-sm font-medium text-gray-700 mb-1">
                Affected Systems <span className="text-red-500">*</span>
              </label>
              <div className="flex mb-2">
                <input
                  type="text"
                  id="affectedSystems"
                  value={systemInput}
                  onChange={(e) => setSystemInput(e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add system name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSystem();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addSystem}
                  className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus size={20} />
                </button>
              </div>
              {errors.affectedSystems && (
                <p className="mt-1 text-sm text-red-600">{errors.affectedSystems}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {affectedSystems.map((system, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <span className="text-sm text-gray-800">{system}</span>
                    <button
                      type="button"
                      onClick={() => removeSystem(system)}
                      className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-1">
                Impact
              </label>
              <textarea
                id="impact"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Impact on users, systems, or organization"
              />
            </div>
            
            <div>
              <label htmlFor="mitigation" className="block text-sm font-medium text-gray-700 mb-1">
                Mitigation
              </label>
              <textarea
                id="mitigation"
                value={mitigation}
                onChange={(e) => setMitigation(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Steps taken to address the incident"
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" icon={<Save size={18} />}>
              Submit Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;