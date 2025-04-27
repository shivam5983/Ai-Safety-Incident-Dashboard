import React from 'react';
import { IncidentFilters, IncidentSeverity, IncidentCategory, IncidentStatus } from '../../types/incident';
import { Filter, Search, SortAsc, SortDesc } from 'lucide-react';
import Button from '../ui/Button';

interface FilterBarProps {
  filters: IncidentFilters;
  onFiltersChange: (filters: Partial<IncidentFilters>) => void;
  onAddIncident: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange, onAddIncident }) => {
  const toggleSortDirection = () => {
    onFiltersChange({
      sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            placeholder="Search incidents..."
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <Button 
          onClick={onAddIncident}
          className="md:w-auto"
        >
          Report Incident
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
        <div className="flex items-center space-x-2 col-span-1 md:col-span-5">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <div>
          <label htmlFor="severity-filter" className="block text-xs font-medium text-gray-500 mb-1">
            Severity
          </label>
          <select
            id="severity-filter"
            value={filters.severity}
            onChange={(e) => onFiltersChange({ severity: e.target.value as IncidentSeverity | '' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="category-filter" className="block text-xs font-medium text-gray-500 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => onFiltersChange({ category: e.target.value as IncidentCategory | '' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
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
          <label htmlFor="status-filter" className="block text-xs font-medium text-gray-500 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => onFiltersChange({ status: e.target.value as IncidentStatus | '' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="sort-by" className="block text-xs font-medium text-gray-500 mb-1">
            Sort By
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as 'date' | 'severity' | 'title' })}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="date">Date</option>
            <option value="severity">Severity</option>
            <option value="title">Title</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Order
          </label>
          <button
            onClick={toggleSortDirection}
            className="w-full flex items-center justify-center px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filters.sortDirection === 'asc' ? (
              <>
                <SortAsc size={18} className="mr-2" />
                <span>Ascending</span>
              </>
            ) : (
              <>
                <SortDesc size={18} className="mr-2" />
                <span>Descending</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;