import React, { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if provided, otherwise render default error message
      return this.props.fallback || (
        <div className="p-6 bg-red-900 text-white rounded-lg">
          <h2 className="text-xl font-bold mb-2">Algo deu errado</h2>
          <p className="mb-4">Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>
          <button 
            className="bg-white text-red-900 px-4 py-2 rounded-md font-bold"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Tentar Novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional component wrapper for the class component
const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

// Custom hook for creating error boundaries around specific components
export const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);
  
  const resetError = () => setError(null);
  
  const showBoundary = (error: Error) => {
    setError(error);
  };
  
  return {
    error,
    resetError,
    showBoundary
  };
};

export default ErrorBoundary;
