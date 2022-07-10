import React, { Component, PropsWithChildren } from 'react';

type ErrorBoundaryProps = PropsWithChildren<{}>;

type ErrorBoundaryState = {
  hasError: boolean;
};

const initialState: ErrorBoundaryState = {
  hasError: false,
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = initialState;

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return hasError ? (
      <span role="error-boundary">Произошла ошибка</span>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
