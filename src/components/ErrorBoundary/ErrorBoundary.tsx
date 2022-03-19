import React, { ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Uncaught Error: ', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Oops, something went wrong with your component</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
