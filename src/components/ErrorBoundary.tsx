import { Component, type ErrorInfo, type ReactNode } from "react";
import "./ErrorBoundary.css";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Top-level error boundary. Prevents a single component crash from
 * tearing down the whole application; in development the underlying
 * error is logged so it is still surfaced in the console.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info.componentStack);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <main className="error-boundary" role="alert" aria-live="assertive">
        <div className="error-boundary-inner">
          <p className="error-boundary-kicker">Unexpected error</p>
          <h1 className="error-boundary-title">Something went wrong.</h1>
          <p className="error-boundary-copy">
            An unexpected error interrupted this view. Reload the page or return to
            the home screen to continue.
          </p>
          <div className="error-boundary-actions">
            <button type="button" className="error-boundary-button" onClick={this.handleReload}>
              Reload page
            </button>
            <a className="error-boundary-link" href="/">
              Go home
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
