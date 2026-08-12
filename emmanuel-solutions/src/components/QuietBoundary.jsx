import { Component } from "react";

/* A decorative enhancement must never take the page down with it.
   Where ErrorBoundary shows a visible "we could not display this"
   panel — correct for a whole route — this one renders nothing at
   all. If the 3D mascot fails on some GPU, driver or browser we
   have not tested, the visitor simply sees the plain rail item and
   never learns anything went wrong. */

export class QuietBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    if (typeof console !== "undefined") {
      console.warn("Decorative element failed, degrading silently:", error, info);
    }
    this.props.onFail && this.props.onFail();
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
