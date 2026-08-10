import { Component } from "react";

/* A crash on one route should never blank the whole site.
   Without this, an uncaught render error destroys the React tree —
   the page goes white AND the back button stops responding, because
   nothing is left to handle navigation. */

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    if (typeof console !== "undefined") {
      console.error("Render error:", error, info);
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="es-crash" role="alert">
          <p className="es-crash-label">Something went wrong on this page</p>
          <h1 className="es-crash-title">We could not display this content</h1>
          <p className="es-crash-body">
            The rest of the site is working normally. Please head back to the homepage,
            or email <a href="mailto:isaac@emmanuelsolutionss.com">isaac@emmanuelsolutionss.com</a> if
            this keeps happening.
          </p>
          <div className="es-crash-actions">
            <a href="/" className="btn btn-primary">Back to homepage</a>
            <button className="btn btn-secondary" onClick={() => window.history.back()}>
              Go back
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
