import React, { useEffect, useState } from 'react';

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

// Define the Performance context
export const PerformanceContext = React.createContext<{
  startMeasure: (id: string) => void;
  endMeasure: (id: string) => number;
  getMetrics: () => Record<string, number>;
  clearMetrics: () => void;
}>({
  startMeasure: () => {},
  endMeasure: () => 0,
  getMetrics: () => ({}),
  clearMetrics: () => {}
});

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ children }) => {
  // Store start times and metrics
  const [startTimes, setStartTimes] = useState<Record<string, number>>({});
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  
  // Monitor overall page performance
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Listen for performance entries
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Store important metrics
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            setMetrics(prev => ({
              ...prev,
              'page-load': navEntry.loadEventEnd - navEntry.startTime,
              'dom-complete': navEntry.domComplete - navEntry.startTime,
              'first-contentful-paint': navEntry.domContentLoadedEventEnd - navEntry.startTime
            }));
          }
          
          if (entry.entryType === 'resource') {
            // Track resource loading times
            const resourceEntry = entry as PerformanceResourceTiming;
            setMetrics(prev => ({
              ...prev,
              [`resource-${resourceEntry.name.split('/').pop()}`]: resourceEntry.duration
            }));
          }
        });
      });
      
      // Observe different types of performance entries
      observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
      
      return () => observer.disconnect();
    }
  }, []);
  
  // Start measuring a specific operation
  const startMeasure = (id: string) => {
    setStartTimes(prev => ({
      ...prev,
      [id]: performance.now()
    }));
  };
  
  // End measuring and return duration
  const endMeasure = (id: string): number => {
    const endTime = performance.now();
    const startTime = startTimes[id];
    
    if (!startTime) {
      console.warn(`No start time found for measurement: ${id}`);
      return 0;
    }
    
    const duration = endTime - startTime;
    
    // Store the metric
    setMetrics(prev => ({
      ...prev,
      [id]: duration
    }));
    
    // Clean up start time
    setStartTimes(prev => {
      const newTimes = { ...prev };
      delete newTimes[id];
      return newTimes;
    });
    
    return duration;
  };
  
  // Get all metrics
  const getMetrics = () => {
    return metrics;
  };
  
  // Clear all metrics
  const clearMetrics = () => {
    setMetrics({});
    setStartTimes({});
  };
  
  // Log performance issues to console in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      Object.entries(metrics).forEach(([key, value]) => {
        if (key.startsWith('page-') && value > 3000) {
          console.warn(`Performance issue: ${key} took ${value.toFixed(2)}ms`);
        }
        if (key.startsWith('component-') && value > 100) {
          console.warn(`Performance issue: ${key} took ${value.toFixed(2)}ms`);
        }
      });
    }
  }, [metrics]);
  
  return (
    <PerformanceContext.Provider value={{ startMeasure, endMeasure, getMetrics, clearMetrics }}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Custom hook to use the performance monitor
export const usePerformance = () => {
  const context = React.useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceMonitor');
  }
  return context;
};

export default PerformanceMonitor;
