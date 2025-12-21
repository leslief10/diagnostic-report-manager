import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('should render skeleton element', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
  });

  it('should render as div element', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.querySelector('div');
    expect(skeleton).toBeInTheDocument();
  });

  it('should apply base skeleton classes', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded');
  });

  describe('custom className', () => {
    it('should accept custom className', () => {
      const { container } = render(<Skeleton className="custom-class" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('custom-class');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<Skeleton className="mt-4" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded', 'mt-4');
    });

    it('should override default dimensions with custom className', () => {
      const { container } = render(<Skeleton className="h-20 w-40" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('h-20', 'w-40');
    });
  });

  describe('accessibility', () => {
    it('should be rendered as div', () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.querySelector('div');
      expect(skeleton?.tagName).toBe('DIV');
    });

    it('should accept aria attributes', () => {
      const { container } = render(<Skeleton aria-label="Loading content" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    });

    it('should be perceivable as loading indicator', () => {
      const { container } = render(<Skeleton className="aria-busy:opacity-50" />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('variations', () => {
    it('should render text-like skeleton', () => {
      const { container } = render(<Skeleton className="h-4 w-full" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('h-4', 'w-full');
    });

    it('should render avatar-like skeleton', () => {
      const { container } = render(<Skeleton className="h-10 w-10 rounded-full" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('h-10', 'w-10', 'rounded-full');
    });

    it('should render button-like skeleton', () => {
      const { container } = render(<Skeleton className="h-10 w-32" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('h-10', 'w-32');
    });
  });

  describe('multiple skeletons', () => {
    it('should render multiple skeletons independently', () => {
      const { container } = render(
        <>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </>,
      );
      const skeletons = container.querySelectorAll('div');
      expect(skeletons.length).toBeGreaterThanOrEqual(3);
    });

    it('should apply pulse animation to all skeletons', () => {
      const { container } = render(
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>,
      );
      const skeletons = container.querySelectorAll('[class*="animate-pulse"]');
      expect(skeletons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('edge cases', () => {
    it('should handle empty className', () => {
      const { container } = render(<Skeleton className="" />);
      const skeleton = container.firstChild;
      expect(skeleton).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded');
    });

    it('should handle undefined className', () => {
      const { container } = render(<Skeleton className={undefined} />);
      const skeleton = container.firstChild;
      expect(skeleton).toBeInTheDocument();
    });

    it('should render without props', () => {
      const { container } = render(<Skeleton />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('composition', () => {
    it('should work in loading state layouts', () => {
      const { container } = render(
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>,
      );
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(3);
    });
  });
});
