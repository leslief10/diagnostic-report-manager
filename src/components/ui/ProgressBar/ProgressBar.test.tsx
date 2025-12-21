import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('should render progress bar', () => {
    const { container } = render(<ProgressBar value={50} />);
    const progressBar = container.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should render with default max value of 100', () => {
    render(<ProgressBar value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('should accept custom max value', () => {
    render(<ProgressBar value={50} max={200} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemax', '200');
  });

  describe('percentage calculation', () => {
    it('should calculate percentage correctly', () => {
      const { container } = render(<ProgressBar value={50} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '50%' });
    });

    it('should calculate percentage with custom max', () => {
      const { container } = render(<ProgressBar value={50} max={200} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '25%' });
    });

    it('should handle value of 0', () => {
      const { container } = render(<ProgressBar value={0} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('should handle value equal to max', () => {
      const { container } = render(<ProgressBar value={100} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '100%' });
    });

    it('should clamp percentage to 0-100 when value exceeds max', () => {
      const { container } = render(<ProgressBar value={150} max={100} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '100%' });
    });

    it('should clamp percentage to 0-100 when value is negative', () => {
      const { container } = render(<ProgressBar value={-10} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '0%' });
    });

    it('should round percentage display', () => {
      render(<ProgressBar value={33} max={100} showPercentage />);
      expect(screen.getByText('33%')).toBeInTheDocument();
    });

    it('should round percentage correctly for decimal values', () => {
      render(<ProgressBar value={33.7} max={100} showPercentage />);
      expect(screen.getByText('34%')).toBeInTheDocument();
    });
  });

  describe('percentage display', () => {
    it('should show percentage by default', () => {
      render(<ProgressBar value={75} />);
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('should not show percentage when showPercentage is false', () => {
      render(<ProgressBar value={75} showPercentage={false} />);
      expect(screen.queryByText('75%')).not.toBeInTheDocument();
    });

    it('should display correct percentage for various values', () => {
      const { rerender } = render(<ProgressBar value={25} />);
      expect(screen.getByText('25%')).toBeInTheDocument();

      rerender(<ProgressBar value={50} />);
      expect(screen.getByText('50%')).toBeInTheDocument();

      rerender(<ProgressBar value={100} />);
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('label', () => {
    it('should render label when provided', () => {
      render(<ProgressBar value={50} label="Download" />);
      expect(screen.getByText('Download')).toBeInTheDocument();
    });

    it('should not render label when not provided', () => {
      const { container } = render(<ProgressBar value={50} label={undefined} showPercentage={false} />);
      const header = container.querySelector('.flex.justify-between');
      expect(header).not.toBeInTheDocument();
    });

    it('should apply label styling', () => {
      render(<ProgressBar value={50} label="Upload" />);
      const label = screen.getByText('Upload');
      expect(label).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
    });

    it('should display label and percentage together', () => {
      render(<ProgressBar value={60} label="Processing" showPercentage />);
      expect(screen.getByText('Processing')).toBeInTheDocument();
      expect(screen.getByText('60%')).toBeInTheDocument();
    });

    it('should only show label when percentage is hidden', () => {
      render(<ProgressBar value={50} label="Status" showPercentage={false} />);
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
    });
  });

  describe('header section visibility', () => {
    it('should show header when label is provided', () => {
      const { container } = render(<ProgressBar value={50} label="Test" />);
      const header = container.querySelector('.flex.justify-between');
      expect(header).toBeInTheDocument();
    });

    it('should show header when showPercentage is true', () => {
      const { container } = render(<ProgressBar value={50} showPercentage />);
      const header = container.querySelector('.flex.justify-between');
      expect(header).toBeInTheDocument();
    });

    it('should not show header when both label and showPercentage are false', () => {
      const { container } = render(<ProgressBar value={50} label={undefined} showPercentage={false} />);
      const header = container.querySelector('.flex.justify-between');
      expect(header).not.toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply base container classes', () => {
      const { container } = render(<ProgressBar value={50} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full');
    });

    it('should apply custom className', () => {
      const { container } = render(<ProgressBar value={50} className="mt-4" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('mt-4');
    });

    it('should merge custom className with base classes', () => {
      const { container } = render(<ProgressBar value={50} className="mb-8" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('w-full', 'mb-8');
    });
  });

  describe('accessibility', () => {
    it('should have progressbar role', () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
    });

    it('should have aria-valuenow attribute', () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('should have aria-valuemin attribute set to 0', () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should have aria-valuemax attribute', () => {
      render(<ProgressBar value={50} max={200} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemax', '200');
    });

    it('should have aria-label with label text', () => {
      render(<ProgressBar value={50} label="Download" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', 'Download');
    });

    it('should have default aria-label when no label provided', () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', 'Progress');
    });

    it('should update aria-valuenow when value changes', () => {
      const { rerender } = render(<ProgressBar value={25} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '25');

      rerender(<ProgressBar value={75} />);
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('animation', () => {
    it('should have transition classes for smooth animation', () => {
      const { container } = render(<ProgressBar value={50} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
    });
  });

  describe('edge cases', () => {
    it('should handle value of 0', () => {
      render(<ProgressBar value={0} showPercentage />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should handle very large max value', () => {
      render(<ProgressBar value={5} max={1000} showPercentage />);
      expect(screen.getByText('1%')).toBeInTheDocument();
    });

    it('should handle decimal values', () => {
      render(<ProgressBar value={33.33} max={100} showPercentage />);
      expect(screen.getByText('33%')).toBeInTheDocument();
    });

    it('should handle zero max value gracefully', () => {
      const { container } = render(<ProgressBar value={50} max={0} />);
      const fill = container.querySelector('[role="progressbar"]');
      expect(fill).toHaveStyle({ width: '100%' });
    });
  });

  describe('multiple instances', () => {
    it('should render multiple progress bars independently', () => {
      render(
        <>
          <ProgressBar value={25} label="Task 1" />
          <ProgressBar value={50} label="Task 2" />
          <ProgressBar value={100} label="Task 3" />
        </>,
      );
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
      expect(screen.getByText('25%')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });
});
