import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

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
          'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-wix-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-linear-to-r from-wix-gradient-1 to-wix-gradient-3 text-white shadow-md hover:shadow-lg hover:scale-[1.02]': variant === 'primary',
            'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm': variant === 'secondary',
            'border-2 border-wix-accent text-wix-accent hover:bg-wix-accent hover:text-white': variant === 'outline',
            'text-gray-500 hover:text-gray-900 hover:bg-gray-100': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600 shadow-md': variant === 'danger',
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