import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchStatus } from './SearchStatus';

describe('SearchStatus', () => {
  it('should render status element', () => {
    const { container } = render(<SearchStatus searchQuery="" />);
    const status = container.querySelector('[role="status"]');
    expect(status).toBeInTheDocument();
  });

  it('should have status role', () => {
    const { container } = render(<SearchStatus searchQuery="test" />);
    const status = container.querySelector('[role="status"]');
    expect(status).toHaveAttribute('role', 'status');
  });

  it('should have aria-live="polite"', () => {
    const { container } = render(<SearchStatus searchQuery="test" />);
    const status = container.querySelector('[role="status"]');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('should be screen reader only', () => {
    const { container } = render(<SearchStatus searchQuery="test" />);
    const status = container.querySelector('[role="status"]');
    expect(status).toHaveClass('sr-only');
  });

  describe('content display', () => {
    it('should display search query when provided', () => {
      render(<SearchStatus searchQuery="thermal" />);
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: thermal');
    });

    it('should be empty when no search query', () => {
      render(<SearchStatus searchQuery="" />);
      const status = screen.getByRole('status');
      expect(status.textContent).toBe('');
    });

    it('should display multiple word search query', () => {
      render(<SearchStatus searchQuery="vibration analysis report" />);
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: vibration analysis report');
    });

    it('should update content when search query changes', () => {
      const { rerender } = render(<SearchStatus searchQuery="test1" />);
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: test1');

      rerender(<SearchStatus searchQuery="test2" />);
      expect(status).toHaveTextContent('Searching for: test2');
    });
  });

  describe('accessibility', () => {
    it('should announce search status to screen readers', () => {
      render(<SearchStatus searchQuery="report" />);
      const status = screen.getByRole('status');
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('should be hidden from visual display', () => {
      const { container } = render(<SearchStatus searchQuery="test" />);
      const status = container.querySelector('[role="status"]');
      expect(status).toHaveClass('sr-only');
    });

    it('should not disrupt visual layout', () => {
      const { container } = render(<SearchStatus searchQuery="test" />);
      const status = container.querySelector('[role="status"]');
      expect(status?.className).toContain('sr-only');
    });
  });

  describe('dynamic updates', () => {
    it('should update when search query becomes non-empty', () => {
      const { rerender } = render(<SearchStatus searchQuery="" />);
      let status = screen.getByRole('status');
      expect(status.textContent).toBe('');

      rerender(<SearchStatus searchQuery="new search" />);
      status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: new search');
    });

    it('should update when search query becomes empty', () => {
      const { rerender } = render(<SearchStatus searchQuery="old search" />);
      let status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: old search');

      rerender(<SearchStatus searchQuery="" />);
      status = screen.getByRole('status');
      expect(status.textContent).toBe('');
    });

    it('should handle special characters in query', () => {
      render(<SearchStatus searchQuery="report-2024_v1" />);
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('Searching for: report-2024_v1');
    });
  });

  describe('edge cases', () => {
    it('should handle whitespace-only search query', () => {
      render(<SearchStatus searchQuery="   " />);
      const status = screen.getByRole('status');
      expect(status.textContent).toBe('');
    });

    it('should handle very long search query', () => {
      const longQuery = 'a'.repeat(200);
      render(<SearchStatus searchQuery={longQuery} />);
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent(`Searching for: ${longQuery}`);
    });

    it('should handle empty string', () => {
      render(<SearchStatus searchQuery="" />);
      const status = screen.getByRole('status');
      expect(status.textContent).toBe('');
    });
  });

  describe('multiple instances', () => {
    it('should render multiple status elements independently', () => {
      const { container } = render(
        <>
          <SearchStatus searchQuery="search1" />
          <SearchStatus searchQuery="search2" />
        </>,
      );
      const statuses = container.querySelectorAll('[role="status"]');
      expect(statuses).toHaveLength(2);
      expect(statuses[0]).toHaveTextContent('Searching for: search1');
      expect(statuses[1]).toHaveTextContent('Searching for: search2');
    });
  });
});
