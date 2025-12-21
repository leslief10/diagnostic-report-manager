import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CardHeader } from './CardHeader';

describe('CardHeader', () => {
  it('should render card header element', () => {
    const { container } = render(<CardHeader>Header content</CardHeader>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render children', () => {
    const { container } = render(
      <CardHeader>
        <div>Test header</div>
      </CardHeader>,
    );
    expect(container.textContent).toContain('Test header');
  });

  it('should apply header styling classes', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    const header = container.firstChild;
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-4', 'pb-3');
  });

  it('should accept custom className', () => {
    const { container } = render(<CardHeader className="custom-header">Content</CardHeader>);
    const header = container.firstChild;
    expect(header).toHaveClass('custom-header');
  });

  it('should merge custom className with base classes', () => {
    const { container } = render(<CardHeader className="border-b">Header</CardHeader>);
    const header = container.firstChild;
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-4', 'pb-3', 'border-b');
  });

  it('should render multiple children', () => {
    const { container } = render(
      <CardHeader>
        <div>Title</div>
        <div>Subtitle</div>
      </CardHeader>,
    );
    expect(container.textContent).toContain('Title');
    expect(container.textContent).toContain('Subtitle');
  });

  it('should forward HTML attributes', () => {
    const { container } = render(<CardHeader data-testid="card-header">Content</CardHeader>);
    expect(container.querySelector('[data-testid="card-header"]')).toBeInTheDocument();
  });
});
