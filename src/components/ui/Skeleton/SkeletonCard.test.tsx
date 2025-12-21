import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonCard } from './SkeletonCard';

describe('SkeletonCard', () => {
  it('should render skeleton card', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render multiple skeleton elements', () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  describe('header section', () => {
    it('should have header layout', () => {
      const { container } = render(<SkeletonCard />);
      const header = container.querySelector('.flex.items-start.justify-between');
      expect(header).toBeInTheDocument();
    });

    it('should have title skeleton', () => {
      const { container } = render(<SkeletonCard />);
      const titleSkeleton = container.querySelector('[class*="h-5"][class*="w-3"]');
      expect(titleSkeleton).toBeInTheDocument();
    });

    it('should have badge skeletons', () => {
      const { container } = render(<SkeletonCard />);
      const badges = container.querySelectorAll('.rounded-full');
      expect(badges.length).toBeGreaterThanOrEqual(2);
    });

    it('should have action skeleton', () => {
      const { container } = render(<SkeletonCard />);
      const actionSkeleton = container.querySelector('.h-8.w-24');
      expect(actionSkeleton).toBeInTheDocument();
    });
  });

  describe('content section', () => {
    it('should render default 3 content lines', () => {
      const { container } = render(<SkeletonCard />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      expect(contentSkeletons.length).toBe(3);
    });

    it('should render custom number of lines', () => {
      const { container } = render(<SkeletonCard lines={5} />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      expect(contentSkeletons.length).toBe(5);
    });

    it('should render single line when lines={1}', () => {
      const { container } = render(<SkeletonCard lines={1} />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      expect(contentSkeletons.length).toBe(1);
    });
  });

  describe('animation', () => {
    it('should have pulse animation on all skeletons', () => {
      const { container } = render(<SkeletonCard />);
      const skeletons = container.querySelectorAll('.animate-pulse');
      skeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass('animate-pulse');
      });
    });

    it('should animate title skeleton', () => {
      const { container } = render(<SkeletonCard />);
      const titleSkeleton = container.querySelector('[class*="h-5"][class*="w-3"]');
      expect(titleSkeleton).toHaveClass('animate-pulse');
    });

    it('should animate all content lines', () => {
      const { container } = render(<SkeletonCard lines={3} />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      contentSkeletons.forEach((skeleton) => {
        expect(skeleton).toHaveClass('animate-pulse');
      });
    });
  });

  describe('accessibility', () => {
    it('should have aria-busy attribute', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.firstChild;
      expect(card).toHaveAttribute('aria-busy', 'true');
    });

    it('should be perceivable as loading state', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.querySelector('[aria-busy="true"]');
      expect(card).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have gray border', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.querySelector('.border-gray-200');
      expect(card).toBeInTheDocument();
    });

    it('should have rounded corners', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.querySelector('.rounded-lg');
      expect(card).toHaveClass('rounded-lg');
    });

    it('should have consistent padding', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.querySelector('.p-4');
      expect(card).toHaveClass('p-4');
    });
  });

  describe('size variations', () => {
    it('should render small title skeleton', () => {
      const { container } = render(<SkeletonCard />);
      const titleSkeleton = container.querySelector('.h-5');
      expect(titleSkeleton).toHaveClass('h-5');
    });

    it('should render medium badge skeletons', () => {
      const { container } = render(<SkeletonCard />);
      const badges = container.querySelectorAll('.h-6');
      expect(badges.length).toBeGreaterThanOrEqual(2);
    });

    it('should render small content skeletons', () => {
      const { container } = render(<SkeletonCard />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      expect(contentSkeletons.length).toBeGreaterThan(0);
    });

    it('should render larger action skeleton', () => {
      const { container } = render(<SkeletonCard />);
      const actionSkeleton = container.querySelector('.h-8');
      expect(actionSkeleton).toBeInTheDocument();
    });
  });

  describe('composition', () => {
    it('should work in grid of loading cards', () => {
      const { container } = render(
        <div className="grid grid-cols-1 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>,
      );
      const cards = container.querySelectorAll('[aria-busy="true"]');
      expect(cards.length).toBe(3);
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <>
          <SkeletonCard lines={2} />
          <SkeletonCard lines={4} />
        </>,
      );
      const allSkeletons = container.querySelectorAll('.h-4');
      expect(allSkeletons.length).toBe(6);
    });
  });

  describe('edge cases', () => {
    it('should handle lines={0}', () => {
      const { container } = render(<SkeletonCard lines={0} />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      expect(contentSkeletons.length).toBe(0);
    });

    it('should handle large number of lines', () => {
      const { container } = render(<SkeletonCard lines={10} />);
      const contentSkeletons = container.querySelectorAll('.h-4');
      expect(contentSkeletons.length).toBe(10);
    });

    it('should render without props', () => {
      const { container } = render(<SkeletonCard />);
      const card = container.querySelector('[aria-busy="true"]');
      expect(card).toBeInTheDocument();
    });

    it('should render consistently on multiple mounts', () => {
      const { container: container1 } = render(<SkeletonCard lines={3} />);
      const { container: container2 } = render(<SkeletonCard lines={3} />);

      const skeletons1 = container1.querySelectorAll('.animate-pulse');
      const skeletons2 = container2.querySelectorAll('.animate-pulse');

      expect(skeletons1.length).toBe(skeletons2.length);
    });
  });
});
