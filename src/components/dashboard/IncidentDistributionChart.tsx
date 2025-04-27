import React, { useMemo } from 'react';
import { Incident } from '../../types/incident';
import Card, { CardHeader, CardContent } from '../ui/Card';

interface ChartBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ label, value, maxValue, color }) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-500">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface IncidentDistributionChartProps {
  incidents: Incident[];
}

const IncidentDistributionChart: React.FC<IncidentDistributionChartProps> = ({ incidents }) => {
  const { severityData, categoryData, maxSeverityValue, maxCategoryValue } = useMemo(() => {
    const severityCounts = incidents.reduce((acc, incident) => {
      acc[incident.severity] = (acc[incident.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const categoryCounts = incidents.reduce((acc, incident) => {
      acc[incident.category] = (acc[incident.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const severityData = [
      { label: 'Critical', value: severityCounts.critical || 0, color: 'bg-red-600' },
      { label: 'High', value: severityCounts.high || 0, color: 'bg-orange-500' },
      { label: 'Medium', value: severityCounts.medium || 0, color: 'bg-yellow-500' },
      { label: 'Low', value: severityCounts.low || 0, color: 'bg-blue-500' },
    ];
    
    const categoryData = [
      { label: 'Bias', value: categoryCounts.bias || 0, color: 'bg-indigo-500' },
      { label: 'Misinformation', value: categoryCounts.misinformation || 0, color: 'bg-amber-500' },
      { label: 'Privacy', value: categoryCounts.privacy || 0, color: 'bg-teal-500' },
      { label: 'Security', value: categoryCounts.security || 0, color: 'bg-red-500' },
      { label: 'Harmful Content', value: categoryCounts['harmful-content'] || 0, color: 'bg-rose-500' },
      { label: 'System Manipulation', value: categoryCounts['system-manipulation'] || 0, color: 'bg-purple-500' },
      { label: 'Other', value: categoryCounts.other || 0, color: 'bg-gray-500' },
    ];
    
    const maxSeverityValue = Math.max(...severityData.map(item => item.value), 1);
    const maxCategoryValue = Math.max(...categoryData.map(item => item.value), 1);
    
    return { severityData, categoryData, maxSeverityValue, maxCategoryValue };
  }, [incidents]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Severity Distribution</h3>
        </CardHeader>
        <CardContent>
          {severityData.map((item, index) => (
            <ChartBar
              key={index}
              label={item.label}
              value={item.value}
              maxValue={maxSeverityValue}
              color={item.color}
            />
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Category Distribution</h3>
        </CardHeader>
        <CardContent>
          {categoryData.map((item, index) => (
            <ChartBar
              key={index}
              label={item.label.replace('-', ' ')}
              value={item.value}
              maxValue={maxCategoryValue}
              color={item.color}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentDistributionChart;