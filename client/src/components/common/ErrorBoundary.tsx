import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error:    Error | null;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center px-4">
          <div className="card-elevated p-8 max-w-md w-full text-center animate-scale-in">

            <div className="w-14 h-14 rounded-2xl bg-danger/10 border border-danger/30 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle size={24} className="text-danger" />
            </div>

            <h1 className="font-display font-bold text-xl text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-muted text-sm mb-1">
              An unexpected error occurred in the application.
            </p>

            {this.state.error && (
              <p className="text-xs font-mono text-danger/70 bg-danger/5 border border-danger/20 rounded-xl px-4 py-3 mt-4 text-left break-all">
                {this.state.error.message}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={this.handleReset}
                className="btn-primary flex-1"
              >
                <RotateCcw size={14} />
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="btn-ghost flex-1"
              >
                Reload Page
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}