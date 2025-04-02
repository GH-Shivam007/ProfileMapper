
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  message = 'Loading...',
  fullScreen = false,
}) => {
  const sizeClass = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  }[size];

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center">
        <div
          className={`${sizeClass} animate-spin rounded-full border-t-transparent border-primary`}
        ></div>
        {message && (
          <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingIndicator;
