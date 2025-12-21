import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render badge element', () => {
    const { container } = render(<Badge>Badge</Badge>);
    const badge = container.querySelector('span');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Badge');
  });

  it('should render as span element', () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  describe('variants', () => {
    it('should apply default variant by default', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-gray-200', 'text-gray-900', 'border-gray-300');
    });

    it('should apply vibration variant', () => {
      const { container } = render(<Badge variant="vibration">Vibration</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-800', 'border-purple-200');
    });

    it('should apply thermal variant', () => {
      const { container } = render(<Badge variant="thermal">Thermal</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-800', 'border-orange-200');
    });

    it('should apply success variant', () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800', 'border-green-200');
    });

    it('should apply warning variant', () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800', 'border-yellow-200');
    });

    it('should apply danger variant', () => {
      const { container } = render(<Badge variant="danger">Danger</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800', 'border-red-200');
    });
  });

  describe('base classes', () => {
    it('should apply all base classes', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'rounded-full',
        'border',
        'px-2.5',
        'py-0.5',
        'text-xs',
        'font-semibold',
        'transition-colors',
      );
    });
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(<Badge className="custom-class">Badge</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('custom-class');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<Badge className="mr-2">Badge</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'mr-2');
    });

    it('should merge custom className with variant classes', () => {
      const { container } = render(
        <Badge variant="success" className="uppercase">
          Success
        </Badge>,
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800', 'uppercase');
    });
  });

  describe('content', () => {
    it('should render text content', () => {
      render(<Badge>Text Badge</Badge>);
      expect(screen.getByText('Text Badge')).toBeInTheDocument();
    });

    it('should render children elements', () => {
      const { container } = render(
        <Badge>
          <span>Icon</span> Label
        </Badge>,
      );
      expect(container.textContent).toContain('Icon');
      expect(container.textContent).toContain('Label');
    });

    it('should render JSX content', () => {
      render(
        <Badge>
          <strong>Important</strong>
        </Badge>,
      );
      expect(screen.getByText('Important')).toBeInTheDocument();
    });

    it('should be empty when no content provided', () => {
      const { container } = render(<Badge />);
      const badge = container.querySelector('span');
      expect(badge).toBeInTheDocument();
      expect(badge?.textContent).toBe('');
    });
  });

  describe('HTML attributes', () => {
    it('should forward custom attributes', () => {
      const { container } = render(
        <Badge data-testid="custom-badge" id="badge-1">
          Badge
        </Badge>,
      );
      const badge = container.querySelector('[data-testid="custom-badge"]');
      expect(badge).toHaveAttribute('id', 'badge-1');
    });

    it('should accept aria attributes', () => {
      const { container } = render(
        <Badge aria-label="Status badge" role="status">
          Active
        </Badge>,
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
      expect(badge).toHaveAttribute('role', 'status');
    });

    it('should accept data attributes', () => {
      const { container } = render(
        <Badge data-type="report" data-id="123">
          Badge
        </Badge>,
      );
      const badge = container.querySelector('span');
      expect(badge).toHaveAttribute('data-type', 'report');
      expect(badge).toHaveAttribute('data-id', '123');
    });
  });

  describe('type variants', () => {
    it('should have distinct colors for vibration reports', () => {
      const { container } = render(<Badge variant="vibration">Vibration</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-800');
    });

    it('should have distinct colors for thermal reports', () => {
      const { container } = render(<Badge variant="thermal">Thermal</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-800');
    });

    it('should have distinct colors for success status', () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should have distinct colors for warning status', () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('should have distinct colors for danger status', () => {
      const { container } = render(<Badge variant="danger">Danger</Badge>);
      const badge = container.querySelector('span');
      expect(badge).toHaveClass('bg-red-100', 'text-red-800');
    });
  });

  describe('accessibility', () => {
    it('should be semantically appropriate as span element', () => {
      const { container } = render(<Badge>Badge Label</Badge>);
      const badge = container.querySelector('span');
      expect(badge?.tagName).toBe('SPAN');
    });

    it('should support aria-label for context', () => {
      render(<Badge aria-label="Report type: Vibration">Vibration</Badge>);
      const badge = screen.getByLabelText('Report type: Vibration');
      expect(badge).toBeInTheDocument();
    });

    it('should work with role attribute', () => {
      render(
        <Badge role="status" aria-live="polite">
          Active
        </Badge>,
      );
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('multiple badges', () => {
    it('should render multiple badges independently', () => {
      const { container } = render(
        <>
          <Badge variant="vibration">Vibration</Badge>
          <Badge variant="thermal">Thermal</Badge>
        </>,
      );
      const badges = container.querySelectorAll('span');
      expect(badges).toHaveLength(2);
      expect(badges[0]).toHaveClass('bg-purple-100');
      expect(badges[1]).toHaveClass('bg-orange-100');
    });
  });
});
