import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('should render input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should have generated id when id prop is not provided', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.id).toBeTruthy();
  });

  it('should use provided id prop', () => {
    render(<Input id="custom-id" />);
    const input = screen.getByRole('textbox');
    expect(input.id).toBe('custom-id');
  });

  it('should accept and display value', async () => {
    render(<Input value="test value" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('should handle input changes', async () => {
    const { rerender } = render(<Input value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    rerender(<Input value="new value" onChange={() => {}} />);
    expect(input.value).toBe('new value');
  });

  it('should accept custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  describe('label', () => {
    it('should render label when label prop is provided', () => {
      render(<Input label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('should not render label when label prop is not provided', () => {
      const { container } = render(<Input />);
      const label = container.querySelector('label');
      expect(label).not.toBeInTheDocument();
    });

    it('should associate label with input using for attribute', () => {
      render(<Input id="username-input" label="Username" />);
      const label = screen.getByText('Username') as HTMLLabelElement;
      expect(label.htmlFor).toBe('username-input');
    });

    it('should display required indicator when required is true', () => {
      render(<Input label="Email" required />);
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
      expect(requiredIndicator).toHaveClass('text-red-800');
    });

    it('should not display required indicator when required is false', () => {
      render(<Input label="Email" required={false} />);
      const requiredIndicator = screen.queryByText('*');
      expect(requiredIndicator).not.toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('should render error message when error prop is provided', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should not render error message when error prop is not provided', () => {
      render(<Input />);
      const errorMessages = screen.queryByRole('alert');
      expect(errorMessages).not.toBeInTheDocument();
    });

    it('should apply error styling when error is present', () => {
      const { container } = render(<Input error="Error message" />);
      const input = container.querySelector('input');
      expect(input).toHaveClass('border-red-700', 'focus-visible:ring-red-700');
    });

    it('should set aria-invalid to true when error is present', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should set aria-invalid to false when no error', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('should display error with alert role', () => {
      render(<Input error="Validation failed" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Validation failed');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should associate error message with input via aria-describedby', () => {
      render(<Input id="email" error="Invalid email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('email-error'));
    });
  });

  describe('helper text', () => {
    it('should render helper text when helperText prop is provided', () => {
      render(<Input helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('should not render helper text when helperText prop is not provided', () => {
      render(<Input />);
      const helperTexts = screen.queryByText(/helper/i);
      expect(helperTexts).not.toBeInTheDocument();
    });

    it('should not render helper text when error is present', () => {
      render(<Input error="Error" helperText="Helper text" />);
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('should associate helper text with input via aria-describedby', () => {
      render(<Input id="email" helperText="example@email.com" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining('email-helper'));
    });
  });

  describe('fullWidth', () => {
    it('should apply full width class when fullWidth is true', () => {
      const { container } = render(<Input fullWidth />);
      const wrapper = container.querySelector('div');
      expect(wrapper).toHaveClass('w-full');
    });

    it('should not apply full width class by default', () => {
      const { container } = render(<Input />);
      const wrapper = container.querySelector('div');
      expect(wrapper).not.toHaveClass('w-full');
    });
  });

  describe('disabled state', () => {
    it('should disable input when disabled prop is true', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('should not be disabled by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).not.toBeDisabled();
    });

    it('should apply disabled styling', () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector('input');
      expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
    });
  });

  describe('input types', () => {
    it('should accept type prop', () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('should default to text type', () => {
      render(<Input />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.type).toBe('text');
    });

    it('should accept email type', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.type).toBe('email');
    });

    it('should accept number type', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton') as HTMLInputElement;
      expect(input.type).toBe('number');
    });
  });

  describe('required attribute', () => {
    it('should set required attribute when required is true', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
    });

    it('should not set required attribute when required is false', () => {
      render(<Input required={false} />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('required');
    });
  });

  describe('placeholder', () => {
    it('should display placeholder text', () => {
      render(<Input placeholder="Enter text..." />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.placeholder).toBe('Enter text...');
    });
  });

  describe('base styles', () => {
    it('should apply all base classes', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      expect(input).toHaveClass(
        'h-10',
        'w-full',
        'rounded-md',
        'border',
        'bg-white',
        'px-3',
        'py-2',
        'text-sm',
        'placeholder:text-gray-400',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-slate-blue',
        'focus-visible:ring-offset-2',
      );
    });
  });

  describe('aria-describedby with multiple values', () => {
    it('should include both error and helper in aria-describedby', () => {
      render(<Input id="field" error="Error" helperText="Helper" />);
      const input = screen.getByRole('textbox');
      const ariaDescribedBy = input.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toContain('field-error');
    });
  });
});
