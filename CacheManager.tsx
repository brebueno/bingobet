import React, { useState, useEffect, useCallback } from 'react';

interface CacheManagerProps {
  children: React.ReactNode;
}

// Define the cache context
export const CacheContext = React.createContext<{
  getItem: (key: string) => any;
  setItem: (key: string, value: any, ttl?: number) => void;
  removeItem: (key: string) => void;
  clearCache: () => void;
}>({
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clearCache: () => {}
});

const CacheManager: React.FC<CacheManagerProps> = ({ children }) => {
  // Initialize cache state
  const [cache, setCache] = useState<Record<string, { value: any; expiry: number | null }>>({});
  
  // Clean expired items periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      const newCache = { ...cache };
      let hasChanges = false;
      
      Object.keys(newCache).forEach(key => {
        if (newCache[key].expiry !== null && newCache[key].expiry < now) {
          delete newCache[key];
          hasChanges = true;
        }
      });
      
      if (hasChanges) {
        setCache(newCache);
      }
    }, 60000); // Clean up every minute
    
    return () => clearInterval(cleanupInterval);
  }, [cache]);
  
  // Get item from cache
  const getItem = useCallback((key: string) => {
    const item = cache[key];
    if (!item) return null;
    
    // Check if item has expired
    if (item.expiry !== null && item.expiry < Date.now()) {
      // Remove expired item
      const newCache = { ...cache };
      delete newCache[key];
      setCache(newCache);
      return null;
    }
    
    return item.value;
  }, [cache]);
  
  // Set item in cache with optional TTL (time to live) in milliseconds
  const setItem = useCallback((key: string, value: any, ttl?: number) => {
    const expiry = ttl ? Date.now() + ttl : null;
    setCache(prevCache => ({
      ...prevCache,
      [key]: { value, expiry }
    }));
  }, []);
  
  // Remove item from cache
  const removeItem = useCallback((key: string) => {
    setCache(prevCache => {
      const newCache = { ...prevCache };
      delete newCache[key];
      return newCache;
    });
  }, []);
  
  // Clear entire cache
  const clearCache = useCallback(() => {
    setCache({});
  }, []);
  
  // Provide cache functions to children
  return (
    <CacheContext.Provider value={{ getItem, setItem, removeItem, clearCache }}>
      {children}
    </CacheContext.Provider>
  );
};

// Custom hook to use the cache
export const useCache = () => {
  const context = React.useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheManager');
  }
  return context;
};

export default CacheManager;
