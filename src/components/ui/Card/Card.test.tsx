import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('should render card element', () => {
    const { container } = render(<Card>Card content</Card>);
    const card = container.querySelector('div');
    expect(card).toBeInTheDocument();
  });

  it('should render children', () => {
    const { container } = render(
      <Card>
        <div>Test content</div>
      </Card>,
    );
    expect(container.textContent).toContain('Test content');
  });

  it('should apply card styling classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-lg', 'border-gray-200', 'bg-white', 'shadow-sm');
  });

  it('should accept custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('custom-class');
  });

  it('should merge custom className with base classes', () => {
    const { container } = render(<Card className="mt-4">Content</Card>);
    const card = container.firstChild;
    expect(card).toHaveClass('rounded-lg', 'border-gray-200', 'bg-white', 'shadow-sm', 'mt-4');
  });

  it('should render multiple children', () => {
    const { container } = render(
      <Card>
        <div>First</div>
        <div>Second</div>
      </Card>,
    );
    expect(container.textContent).toContain('First');
    expect(container.textContent).toContain('Second');
  });

  it('should forward HTML attributes', () => {
    const { container } = render(
      <Card data-testid="card" role="article">
        Content
      </Card>,
    );
    const card = container.querySelector('[data-testid="card"]');
    expect(card).toHaveAttribute('role', 'article');
  });
});
