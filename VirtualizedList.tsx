import React, { useCallback, useEffect, useState } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight: number;
  height?: number;
  width?: string | number;
  className?: string;
  overscan?: number;
  onEndReached?: () => void;
  endReachedThreshold?: number;
}

function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  height = 500,
  width = '100%',
  className = '',
  overscan = 5,
  onEndReached,
  endReachedThreshold = 200
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setScrollTop(scrollTop);

    // Check if we've scrolled near the end
    if (
      onEndReached &&
      scrollHeight - scrollTop - clientHeight < endReachedThreshold
    ) {
      onEndReached();
    }
  }, [onEndReached, endReachedThreshold]);

  // Calculate the range of visible items
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + height) / itemHeight) + overscan
  );

  // Render only the visible items
  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => {
    const actualIndex = startIndex + index;
    return (
      <div
        key={actualIndex}
        style={{
          position: 'absolute',
          top: actualIndex * itemHeight,
          height: itemHeight,
          width: '100%'
        }}
      >
        {renderItem(item, actualIndex)}
      </div>
    );
  });

  return (
    <div
      ref={setContainerRef}
      onScroll={handleScroll}
      style={{
        height,
        width,
        overflow: 'auto',
        position: 'relative'
      }}
      className={className}
    >
      <div
        style={{
          height: items.length * itemHeight,
          position: 'relative'
        }}
      >
        {visibleItems}
      </div>
    </div>
  );
}

export default VirtualizedList;
