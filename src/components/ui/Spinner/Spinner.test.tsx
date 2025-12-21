import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('should render spinner element', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toBeInTheDocument();
  });

  it('should render as div with status role', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should render SVG element', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  describe('sizes', () => {
    it('should apply small size', () => {
      const { container } = render(<Spinner size="sm" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-4', 'w-4');
    });

    it('should apply medium size by default', () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-6', 'w-6');
    });

    it('should apply large size', () => {
      const { container } = render(<Spinner size="lg" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-8', 'w-8');
    });

    it('should not apply size classes for non-specified sizes', () => {
      const { container } = render(<Spinner size="md" />);
      const svg = container.querySelector('svg');
      expect(svg).not.toHaveClass('h-4', 'w-4');
      expect(svg).not.toHaveClass('h-8', 'w-8');
    });
  });

  describe('styling', () => {
    it('should apply animation class', () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('animate-spin');
    });

    it('should apply color class', () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('text-slate-blue');
    });

    it('should apply all base classes to SVG', () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('animate-spin', 'text-slate-blue');
    });

    it('should apply custom className to wrapper', () => {
      const { container } = render(<Spinner className="custom-class" />);
      const wrapper = container.querySelector('[role="status"]');
      expect(wrapper).toHaveClass('custom-class');
    });

    it('should not apply SVG size classes when custom className is provided', () => {
      const { container } = render(<Spinner size="md" className="mt-4" />);
      const wrapper = container.querySelector('[role="status"]');
      expect(wrapper).toHaveClass('mt-4');
    });
  });

  describe('accessibility', () => {
    it('should have status role for screen readers', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('should render screen reader only text', () => {
      const { container } = render(<Spinner />);
      const srText = container.querySelector('.sr-only');
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent('Loading...');
    });

    it('should have sr-only class on loading text', () => {
      const { container } = render(<Spinner />);
      const srText = container.querySelector('.sr-only');
      expect(srText).toHaveClass('sr-only');
    });

    it('should be accessible to screen readers', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('different size combinations', () => {
    it('should handle small spinner with custom className', () => {
      const { container } = render(<Spinner size="sm" className="text-white" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-4', 'w-4');
    });

    it('should handle large spinner with custom className', () => {
      const { container } = render(<Spinner size="lg" className="mx-auto" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-8', 'w-8');
    });
  });

  describe('rendering consistency', () => {
    it('should render same SVG structure regardless of size', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach((size) => {
        const { container } = render(<Spinner size={size} />);
        expect(container.querySelector('circle')).toBeInTheDocument();
        expect(container.querySelector('path')).toBeInTheDocument();
        expect(container.querySelector('.sr-only')).toBeInTheDocument();
      });
    });
  });

  describe('multiple spinners', () => {
    it('should render multiple spinners independently', () => {
      const { container } = render(
        <>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </>,
      );
      const spinners = container.querySelectorAll('[role="status"]');
      expect(spinners).toHaveLength(3);
      expect(spinners[0].querySelector('svg')).toHaveClass('h-4', 'w-4');
      expect(spinners[1].querySelector('svg')).toHaveClass('h-6', 'w-6');
      expect(spinners[2].querySelector('svg')).toHaveClass('h-8', 'w-8');
    });

    it('should have independent sr-only text for each spinner', () => {
      const { container } = render(
        <>
          <Spinner />
          <Spinner />
        </>,
      );
      const srTexts = container.querySelectorAll('.sr-only');
      expect(srTexts).toHaveLength(2);
    });
  });

  describe('edge cases', () => {
    it('should render with empty className', () => {
      const { container } = render(<Spinner className="" />);
      const wrapper = container.querySelector('[role="status"]');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with undefined size prop', () => {
      const { container } = render(<Spinner size={undefined} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-6', 'w-6');
    });

    it('should render without any props', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('[role="status"]')).toBeInTheDocument();
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});
