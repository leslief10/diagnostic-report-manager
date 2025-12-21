import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CardFooter } from './CardFooter';

describe('CardFooter', () => {
  it('should render card footer element', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render children', () => {
    const { container } = render(
      <CardFooter>
        <div>Footer content</div>
      </CardFooter>,
    );
    expect(container.textContent).toContain('Footer content');
  });

  it('should apply footer styling classes', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    const footer = container.firstChild;
    expect(footer).toHaveClass('flex', 'items-center', 'p-4', 'pt-0');
  });

  it('should accept custom className', () => {
    const { container } = render(<CardFooter className="custom-footer">Content</CardFooter>);
    const footer = container.firstChild;
    expect(footer).toHaveClass('custom-footer');
  });

  it('should merge custom className with base classes', () => {
    const { container } = render(<CardFooter className="justify-between">Footer</CardFooter>);
    const footer = container.firstChild;
    expect(footer).toHaveClass('flex', 'items-center', 'p-4', 'pt-0', 'justify-between');
  });

  it('should render multiple children', () => {
    const { container } = render(
      <CardFooter>
        <button>Cancel</button>
        <button>Submit</button>
      </CardFooter>,
    );
    expect(container.textContent).toContain('Cancel');
    expect(container.textContent).toContain('Submit');
  });

  it('should render buttons correctly', () => {
    const { container } = render(
      <CardFooter>
        <button type="button">Action</button>
      </CardFooter>,
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should forward HTML attributes', () => {
    const { container } = render(
      <CardFooter data-testid="card-footer" role="contentinfo">
        Footer
      </CardFooter>,
    );
    const footer = container.querySelector('[data-testid="card-footer"]');
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });

  it('should handle empty footer', () => {
    const { container } = render(<CardFooter />);
    const footer = container.firstChild;
    expect(footer).toBeInTheDocument();
  });

  it('should be flexible for button layouts', () => {
    const { container } = render(
      <CardFooter className="gap-4">
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </CardFooter>,
    );
    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
  });
});
