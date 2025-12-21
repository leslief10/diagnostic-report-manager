import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  describe('variants', () => {
    it('should apply primary variant by default', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-rose-red', 'text-white', 'hover:bg-dark-rose-red');
    });

    it('should apply secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-slate-blue', 'text-white', 'hover:bg-dark-slate-blue');
    });

    it('should apply danger variant', () => {
      const { container } = render(<Button variant="danger">Delete</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-red-700', 'text-white', 'hover:bg-red-800');
    });

    it('should apply outline variant', () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('border', 'border-gray-300', 'hover:bg-gray-100');
    });

    it('should apply transparent variant', () => {
      const { container } = render(<Button variant="transparent">Transparent</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('hover:bg-gray-100', 'hover:text-gray-900');
    });
  });

  describe('sizes', () => {
    it('should apply small size', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('h-9', 'px-3', 'text-sm');
    });

    it('should apply medium size by default', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('h-10', 'px-4', 'py-2');
    });

    it('should apply large size', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('h-11', 'px-6', 'text-lg');
    });
  });

  describe('font weight', () => {
    it('should apply normal font weight by default', () => {
      const { container } = render(<Button>Normal</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('font-normal');
    });

    it('should apply bold font weight', () => {
      const { container } = render(<Button font="bold">Bold</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('font-semibold');
    });
  });

  describe('fullWidth', () => {
    it('should apply full width class when fullWidth is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('w-full');
    });

    it('should not apply full width class by default', () => {
      const { container } = render(<Button>Default Width</Button>);
      const button = container.querySelector('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('disabled state', () => {
    it('should disable button when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: /disabled/i });
      expect(button).toBeDisabled();
    });

    it('should disable button when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not be disabled by default', () => {
      render(<Button>Active</Button>);
      const button = screen.getByRole('button', { name: /active/i });
      expect(button).not.toBeDisabled();
    });

    it('should have aria-busy attribute when isLoading', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should not have aria-busy when not loading', () => {
      render(<Button>Not Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('aria-busy');
    });
  });

  describe('loading state', () => {
    it('should show loading spinner when isLoading is true', () => {
      const { container } = render(<Button isLoading>Loading</Button>);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('animate-spin');
    });

    it('should not show loading spinner by default', () => {
      const { container } = render(<Button>Not Loading</Button>);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('should display children text with loading spinner', () => {
      render(<Button isLoading>Save Changes</Button>);
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
  });

  describe('button type', () => {
    it('should have type button by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should accept custom type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should accept reset type', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('custom className', () => {
    it('should merge custom className with base classes', () => {
      const { container } = render(<Button className="custom-class">Custom</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('event handling', () => {
    it('should handle click events', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should not trigger click when disabled', async () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not trigger click when loading', async () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>,
      );

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('base classes', () => {
    it('should apply all base classes', () => {
      const { container } = render(<Button>Base</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveClass(
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-md',
        'font-medium',
        'transition-colors',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-offset-2',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
      );
    });
  });

  describe('combination of props', () => {
    it('should work with multiple props combined', () => {
      const { container } = render(
        <Button variant="secondary" size="lg" font="bold" fullWidth>
          Combined
        </Button>,
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('bg-slate-blue', 'h-11', 'px-6', 'text-lg', 'font-semibold', 'w-full');
    });

    it('should handle loading state with disabled prop', () => {
      render(
        <Button isLoading disabled>
          Loading
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });
});
