import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('should render search input', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
  });

  it('should have type="search"', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.type).toBe('search');
  });

  it('should render search icon', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should apply search icon styles', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('absolute', 'left-3', 'top-1/2', '-translate-y-1/2');
  });

  it('should apply padding to input for icons', () => {
    const { container } = render(<SearchInput value="" onChange={() => {}} />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('pl-10', 'pr-10');
  });

  describe('clear button', () => {
    it('should not show clear button when value is empty', () => {
      render(<SearchInput value="" onChange={() => {}} />);
      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should show clear button when value is not empty', () => {
      render(<SearchInput value="search term" onChange={() => {}} onClear={() => {}} />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not show clear button when onClear is not provided', () => {
      render(<SearchInput value="search term" onChange={() => {}} />);
      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('should show clear button only when both value and onClear are present', () => {
      render(<SearchInput value="search term" onChange={() => {}} onClear={() => {}} />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    it('should display clear icon in button', () => {
      render(<SearchInput value="search term" onChange={() => {}} onClear={() => {}} />);
      const clearButton = screen.getByLabelText('Clear search');
      const svg = clearButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should apply correct styles to clear button', () => {
      render(<SearchInput value="search term" onChange={() => {}} onClear={() => {}} />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toHaveClass(
        'absolute',
        'right-3',
        'top-1/2',
        '-translate-y-1/2',
        'text-gray-400',
        'hover:text-gray-600',
        'transition-colors',
      );
    });

    it('should be a button with type="button"', () => {
      render(<SearchInput value="search term" onChange={() => {}} onClear={() => {}} />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toHaveAttribute('type', 'button');
    });
  });

  describe('clear functionality', () => {
    it('should call onClear when clear button is clicked', async () => {
      const handleClear = vi.fn();
      render(<SearchInput value="search term" onChange={() => {}} onClear={handleClear} />);

      const clearButton = screen.getByLabelText('Clear search');
      await userEvent.click(clearButton);

      expect(handleClear).toHaveBeenCalledOnce();
    });

    it('should not call onClear for other interactions', async () => {
      const handleClear = vi.fn();
      render(<SearchInput value="search term" onChange={() => {}} onClear={handleClear} />);

      const input = screen.getByRole('searchbox');
      await userEvent.click(input);

      expect(handleClear).not.toHaveBeenCalled();
    });
  });

  describe('input interaction', () => {
    it('should pass through onChange prop to input', async () => {
      const handleChange = vi.fn();
      render(<SearchInput value="" onChange={handleChange} />);

      const input = screen.getByRole('searchbox');
      await userEvent.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should display current value in input', () => {
      render(<SearchInput value="search query" onChange={() => {}} />);
      const input = screen.getByRole('searchbox') as HTMLInputElement;
      expect(input.value).toBe('search query');
    });

    it('should accept placeholder prop', () => {
      render(<SearchInput value="" onChange={() => {}} placeholder="Search reports..." />);
      const input = screen.getByRole('searchbox') as HTMLInputElement;
      expect(input.placeholder).toBe('Search reports...');
    });
  });

  describe('accessibility', () => {
    it('should have proper aria-label on clear button', () => {
      render(<SearchInput value="search" onChange={() => {}} onClear={() => {}} />);
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toHaveAttribute('aria-label', 'Clear search');
    });

    it('should be keyboard accessible', async () => {
      const handleClear = vi.fn();
      render(<SearchInput value="search" onChange={() => {}} onClear={handleClear} />);

      const clearButton = screen.getByLabelText('Clear search');
      clearButton.focus();
      expect(clearButton).toHaveFocus();

      await userEvent.keyboard('{Enter}');
      expect(handleClear).toHaveBeenCalled();
    });
  });

  describe('wrapper container', () => {
    it('should have relative positioning wrapper', () => {
      const { container } = render(<SearchInput value="" onChange={() => {}} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('relative', 'w-full');
    });

    it('should render input inside wrapper', () => {
      const { container } = render(<SearchInput value="" onChange={() => {}} />);
      const wrapper = container.querySelector('div');
      const input = wrapper?.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('prop forwarding', () => {
    it('should forward additional props to Input component', () => {
      render(<SearchInput value="" onChange={() => {}} disabled label="Search" />);
      const input = screen.getByRole('searchbox');
      expect(input).toBeDisabled();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('should handle error prop from Input', () => {
      render(<SearchInput value="" onChange={() => {}} error="Search failed" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Search failed');
    });
  });

  describe('clear button visibility transitions', () => {
    it('should show/hide clear button based on value changes', () => {
      const { rerender } = render(<SearchInput value="" onChange={() => {}} onClear={() => {}} />);

      let clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();

      rerender(<SearchInput value="text" onChange={() => {}} onClear={() => {}} />);
      clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();

      rerender(<SearchInput value="" onChange={() => {}} onClear={() => {}} />);
      clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });
  });
});
