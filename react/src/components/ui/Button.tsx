import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-xl transition-wix focus:outline-none focus:ring-2 focus:ring-wix-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'gradient-primary text-white shadow-wix hover:shadow-wix-hover hover:scale-[1.02]': variant === 'primary',
            'bg-wix-card text-wix-text border border-gray-200 hover:bg-gray-50 shadow-wix-sm': variant === 'secondary',
            'border-2 border-wix-accent text-wix-accent hover:bg-wix-accent hover:text-white': variant === 'outline',
            'text-wix-text-muted hover:text-wix-text hover:bg-gray-100': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600 shadow-wix': variant === 'danger',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';