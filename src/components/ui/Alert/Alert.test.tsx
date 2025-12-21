import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('should render alert element', () => {
    render(<Alert>Alert message</Alert>);
    const alert = screen.getByRole('status');
    expect(alert).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(<Alert>This is an alert message</Alert>);
    expect(screen.getByText('This is an alert message')).toBeInTheDocument();
  });

  it('should render icon', () => {
    const { container } = render(<Alert>Alert</Alert>);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  describe('variants', () => {
    it('should apply info variant by default', () => {
      const { container } = render(<Alert>Info alert</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-blue-50', 'border-blue-200', 'text-blue-900');
    });

    it('should apply success variant', () => {
      const { container } = render(<Alert variant="success">Success</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-green-50', 'border-green-200', 'text-green-900');
    });

    it('should apply warning variant', () => {
      const { container } = render(<Alert variant="warning">Warning</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-yellow-50', 'border-yellow-200', 'text-yellow-900');
    });

    it('should apply danger variant', () => {
      const { container } = render(<Alert variant="danger">Danger</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('bg-red-50', 'border-red-200', 'text-red-900');
    });
  });

  describe('icons', () => {
    it('should render info icon for info variant', () => {
      const { container } = render(<Alert variant="info">Info</Alert>);
      const path = container.querySelector('path');
      expect(path).toHaveAttribute(
        'd',
        expect.stringContaining('M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'),
      );
    });

    it('should render success icon for success variant', () => {
      const { container } = render(<Alert variant="success">Success</Alert>);
      const path = container.querySelector('path');
      expect(path).toHaveAttribute('d', expect.stringContaining('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'));
    });

    it('should render warning icon for warning variant', () => {
      const { container } = render(<Alert variant="warning">Warning</Alert>);
      const path = container.querySelector('path');
      expect(path?.getAttribute('d')).toContain('M12 9v2m0 4h.01m-6.938 4h13.856');
    });

    it('should render danger icon for danger variant', () => {
      const { container } = render(<Alert variant="danger">Danger</Alert>);
      const path = container.querySelector('path');
      expect(path?.getAttribute('d')).toContain('M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2');
    });

    it('should have correct icon styling', () => {
      const { container } = render(<Alert>Alert</Alert>);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-5', 'w-5', 'shrink-0');
    });
  });

  describe('title', () => {
    it('should render title when provided', () => {
      render(<Alert title="Alert Title">Message</Alert>);
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
    });

    it('should not render title when not provided', () => {
      const { container } = render(<Alert>Message</Alert>);
      const heading = container.querySelector('h5');
      expect(heading).not.toBeInTheDocument();
    });

    it('should render title as h5 element', () => {
      const { container } = render(<Alert title="Title">Message</Alert>);
      const heading = container.querySelector('h5');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Title');
    });

    it('should apply title styling', () => {
      const { container } = render(<Alert title="Title">Message</Alert>);
      const heading = container.querySelector('h5');
      expect(heading).toHaveClass('font-semibold', 'mb-1');
    });

    it('should render title and children together', () => {
      render(<Alert title="Error">Something went wrong</Alert>);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have role="status" for info variant', () => {
      render(<Alert variant="info">Info</Alert>);
      const alert = screen.getByRole('status');
      expect(alert).toBeInTheDocument();
    });

    it('should have role="status" for success variant', () => {
      render(<Alert variant="success">Success</Alert>);
      const alert = screen.getByRole('status');
      expect(alert).toBeInTheDocument();
    });

    it('should have role="alert" for warning variant', () => {
      render(<Alert variant="warning">Warning</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should have role="alert" for danger variant', () => {
      render(<Alert variant="danger">Danger</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should have aria-live="polite" for info variant', () => {
      render(<Alert variant="info">Info</Alert>);
      const alert = screen.getByRole('status');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-live="polite" for success variant', () => {
      render(<Alert variant="success">Success</Alert>);
      const alert = screen.getByRole('status');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-live="polite" for warning variant', () => {
      render(<Alert variant="warning">Warning</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should have aria-live="assertive" for danger variant', () => {
      render(<Alert variant="danger">Danger</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });
  });

  describe('styling', () => {
    it('should apply base classes', () => {
      const { container } = render(<Alert>Alert</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('rounded-lg', 'border', 'p-4');
    });

    it('should accept custom className', () => {
      const { container } = render(<Alert className="custom-class">Alert</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('custom-class');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<Alert className="mt-4">Alert</Alert>);
      const alert = container.firstChild;
      expect(alert).toHaveClass('rounded-lg', 'border', 'p-4', 'mt-4');
    });
  });

  describe('HTML attributes', () => {
    it('should forward custom attributes', () => {
      const { container } = render(
        <Alert data-testid="custom-alert" id="alert-1">
          Alert
        </Alert>,
      );
      const alert = container.querySelector('[data-testid="custom-alert"]');
      expect(alert).toHaveAttribute('id', 'alert-1');
    });

    it('should accept any HTML div attributes', () => {
      render(
        <Alert title="Title" className="extra-class">
          Content
        </Alert>,
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
    });
  });

  describe('complex content', () => {
    it('should render JSX content', () => {
      render(
        <Alert title="Error">
          <p>This is a paragraph</p>
          <strong>Important information</strong>
        </Alert>,
      );
      expect(screen.getByText('This is a paragraph')).toBeInTheDocument();
      expect(screen.getByText('Important information')).toBeInTheDocument();
    });

    it('should render long content', () => {
      const longContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      render(<Alert>{longContent}</Alert>);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });
  });
});
