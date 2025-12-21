import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardTitle } from './CardTitle';

describe('CardTitle', () => {
  it('should render card title element', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
  });

  it('should render as heading element', () => {
    const { container } = render(<CardTitle>Report Title</CardTitle>);
    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Report Title');
  });

  it('should apply title styling classes', () => {
    const { container } = render(<CardTitle>Title</CardTitle>);
    const title = container.querySelector('h3');
    expect(title).toHaveClass('text-lg', 'font-semibold', 'leading-none', 'tracking-tight');
  });

  it('should accept custom className', () => {
    const { container } = render(<CardTitle className="text-xl">Title</CardTitle>);
    const title = container.querySelector('h3');
    expect(title).toHaveClass('text-xl');
  });

  it('should merge custom className with base classes', () => {
    const { container } = render(<CardTitle className="text-blue-600">Title</CardTitle>);
    const title = container.querySelector('h3');
    expect(title).toHaveClass('text-lg', 'font-semibold', 'leading-none', 'tracking-tight', 'text-blue-600');
  });

  it('should render text content correctly', () => {
    render(<CardTitle>Diagnostic Report</CardTitle>);
    expect(screen.getByText('Diagnostic Report')).toBeInTheDocument();
  });

  it('should render children elements', () => {
    const { container } = render(
      <CardTitle>
        <span>Diagnostic</span> Report
      </CardTitle>,
    );
    expect(container.textContent).toContain('Diagnostic Report');
  });

  it('should forward HTML attributes', () => {
    const { container } = render(
      <CardTitle data-testid="card-title" id="title-id">
        Title
      </CardTitle>,
    );
    const title = container.querySelector('h3');
    expect(title).toHaveAttribute('data-testid', 'card-title');
    expect(title).toHaveAttribute('id', 'title-id');
  });
});
