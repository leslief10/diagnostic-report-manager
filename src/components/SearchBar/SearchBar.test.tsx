import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('should render search bar', () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search reports by name...');
    expect(input).toBeInTheDocument();
  });

  it('should render search status', () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />);
    const status = container.querySelector('[role="status"]');
    expect(status).toBeInTheDocument();
  });

  describe('input rendering', () => {
    it('should use default placeholder', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText('Search reports by name...');
      expect(input).toBeInTheDocument();
    });

    it('should accept custom placeholder', () => {
      render(<SearchBar onSearch={vi.fn()} placeholder="Custom search..." />);
      const input = screen.getByPlaceholderText('Custom search...');
      expect(input).toBeInTheDocument();
    });

    it('should have aria-label', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByLabelText('Search reports');
      expect(input).toBeInTheDocument();
    });
  });

  describe('search functionality', () => {
    it('should call onSearch when user types', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, 'thermal');

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('thermal');
      });
    });

    it('should debounce search input', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, 'test', { delay: 50 });
      expect(mockOnSearch).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      });
    });

    it('should update input value when user types', async () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText('Search reports by name...') as HTMLInputElement;

      await userEvent.type(input, 'vibration');
      expect(input.value).toBe('vibration');
    });

    it('should clear input when clear button is clicked', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...') as HTMLInputElement;

      await userEvent.type(input, 'test');
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      });

      const clearButton = screen.getByRole('button', { name: /clear/i });
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(input.value).toBe('');
        expect(mockOnSearch).toHaveBeenCalledWith('');
      });
    });
  });

  describe('search status', () => {
    it('should show search status when typing', async () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, 'test');

      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: test');
    });

    it('should hide search status when input is empty', async () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, 'test');
      await userEvent.clear(input);

      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('');
    });

    it('should have aria-live="polite"', () => {
      const { container } = render(<SearchBar onSearch={vi.fn()} />);
      const status = container.querySelector('[role="status"]');
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('should be screen reader only', () => {
      const { container } = render(<SearchBar onSearch={vi.fn()} />);
      const status = container.querySelector('[role="status"]');
      expect(status).toHaveClass('sr-only');
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByLabelText('Search reports');
      expect(input).toBeInTheDocument();
    });

    it('should announce search status to screen readers', () => {
      const { container } = render(<SearchBar onSearch={vi.fn()} />);
      const status = container.querySelector('[role="status"]');
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('should be keyboard accessible', async () => {
      render(<SearchBar onSearch={vi.fn()} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      input.focus();
      expect(document.activeElement).toBe(input);
    });
  });

  describe('integration with useSearch hook', () => {
    it('should manage search state through hook', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...') as HTMLInputElement;

      await userEvent.type(input, 'report');

      await waitFor(() => {
        expect(input.value).toBe('report');
        expect(mockOnSearch).toHaveBeenCalledWith('report');
      });
    });

    it('should handle multiple search queries', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, 'vibration');
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('vibration');
      });

      mockOnSearch.mockClear();
      await userEvent.clear(input);
      await userEvent.type(input, 'thermal');

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('thermal');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty search', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, ' ');

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith(' ');
      });
    });

    it('should handle special characters in search', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      await userEvent.type(input, 'test-report_2024');

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test-report_2024');
      });
    });

    it('should handle very long search queries', async () => {
      const mockOnSearch = vi.fn();
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search reports by name...');

      const longQuery = 'a'.repeat(100);
      await userEvent.type(input, longQuery);

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith(longQuery);
      });
    });
  });
});
