import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, gradient = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300',
          gradient 
            ? 'bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg' 
            : 'bg-white dark:bg-gray-800 shadow-md dark:border-gray-700 border border-gray-100',
          hover && 'hover:-translate-y-1 hover:shadow-xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>{children}</div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold text-gray-900 dark:text-white', className)} {...props}>{children}</h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('text-gray-600 dark:text-gray-400', className)} {...props}>{children}</div>
  )
);
CardContent.displayName = 'CardContent';