import React, { useEffect, useState } from 'react';
import { useCache } from './CacheManager';

interface ApiClientProps {
  children: React.ReactNode;
}

// Define the API context
export const ApiContext = React.createContext<{
  fetchData: <T>(url: string, options?: RequestInit, cacheTtl?: number) => Promise<T>;
  isLoading: boolean;
  error: string | null;
}>({
  fetchData: async () => {
    throw new Error('ApiClient not initialized');
  },
  isLoading: false,
  error: null
});

const ApiClient: React.FC<ApiClientProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getItem, setItem } = useCache();
  
  // Reset error when component mounts
  useEffect(() => {
    setError(null);
  }, []);
  
  // Generic fetch function with caching
  const fetchData = async <T,>(url: string, options?: RequestInit, cacheTtl?: number): Promise<T> => {
    // Generate cache key based on URL and options
    const cacheKey = `api:${url}:${JSON.stringify(options?.body || '')}`;
    
    // Check if data is in cache
    const cachedData = getItem(cacheKey);
    if (cachedData) {
      return cachedData as T;
    }
    
    // If not in cache, fetch from API
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Cache the response if TTL is provided
      if (cacheTtl) {
        setItem(cacheKey, data, cacheTtl);
      }
      
      return data as T;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ApiContext.Provider value={{ fetchData, isLoading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API client
export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiClient');
  }
  return context;
};

export default ApiClient;
