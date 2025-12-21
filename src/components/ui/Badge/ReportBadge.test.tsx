import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReportBadge } from './ReportBadge';

describe('ReportBadge', () => {
  it('should render badge element', () => {
    const { container } = render(<ReportBadge type="Vibration" />);
    const badge = container.querySelector('span');
    expect(badge).toBeInTheDocument();
  });

  it('should render text content', () => {
    render(<ReportBadge type="Vibration" />);
    expect(screen.getByText('Vibration')).toBeInTheDocument();
  });

  it('should render vibration badge', () => {
    render(<ReportBadge type="Vibration" />);
    expect(screen.getByText('Vibration')).toBeInTheDocument();
  });

  it('should render thermal badge', () => {
    render(<ReportBadge type="Thermal" />);
    expect(screen.getByText('Thermal')).toBeInTheDocument();
  });
});
