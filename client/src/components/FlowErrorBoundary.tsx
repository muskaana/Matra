import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  flowName: string;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class FlowErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 text-sm">
          ❌ Error: {this.state.error?.message || 'Unknown error'}
        </div>
      );
    }

    return this.props.children;
  }
}
