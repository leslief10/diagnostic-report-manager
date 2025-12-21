import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CardContent } from './CardContent';

describe('CardContent', () => {
  it('should render card content element', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render children', () => {
    const { container } = render(
      <CardContent>
        <div>Test content</div>
      </CardContent>,
    );
    expect(container.textContent).toContain('Test content');
  });

  it('should apply content styling classes', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    const content = container.firstChild;
    expect(content).toHaveClass('p-4', 'pt-0');
  });

  it('should accept custom className', () => {
    const { container } = render(<CardContent className="custom-content">Content</CardContent>);
    const content = container.firstChild;
    expect(content).toHaveClass('custom-content');
  });

  it('should merge custom className with base classes', () => {
    const { container } = render(<CardContent className="bg-gray-50">Content</CardContent>);
    const content = container.firstChild;
    expect(content).toHaveClass('p-4', 'pt-0', 'bg-gray-50');
  });

  it('should render multiple children', () => {
    const { container } = render(
      <CardContent>
        <p>First paragraph</p>
        <p>Second paragraph</p>
      </CardContent>,
    );
    expect(container.textContent).toContain('First paragraph');
    expect(container.textContent).toContain('Second paragraph');
  });

  it('should render complex children', () => {
    const { container } = render(
      <CardContent>
        <table>
          <tbody>
            <tr>
              <td>Data</td>
            </tr>
          </tbody>
        </table>
      </CardContent>,
    );
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  it('should forward HTML attributes', () => {
    const { container } = render(
      <CardContent data-testid="card-content" role="region">
        Content
      </CardContent>,
    );
    const content = container.querySelector('[data-testid="card-content"]');
    expect(content).toHaveAttribute('role', 'region');
  });

  it('should handle empty content', () => {
    const { container } = render(<CardContent />);
    const content = container.firstChild;
    expect(content).toBeInTheDocument();
  });
});
