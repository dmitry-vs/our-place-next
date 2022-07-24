import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const role = 'child-component';

  it('renders children if there are no errors in children', () => {
    render(
      <ErrorBoundary>
        <div role={role}>Child component</div>
      </ErrorBoundary>
    );

    const renderedChildComponent = screen.getByRole(role);
    expect(renderedChildComponent).toBeInTheDocument();
    expect(renderedChildComponent).toHaveTextContent('Child component');
  });

  it('renders error message if there are errors in children', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const BuggyChild = () => {
      useEffect(() => {
        throw new Error('Buggy component error');
      });
      return <div>Buggy component</div>;
    };

    render(
      <ErrorBoundary>
        <div role={role}>Child component</div>
        <BuggyChild />
      </ErrorBoundary>
    );

    const errorBoundary = screen.getByRole('error-boundary');
    expect(errorBoundary).toBeInTheDocument();
    expect(errorBoundary).toHaveTextContent('Произошла ошибка');

    spy.mockRestore();
  });
});
