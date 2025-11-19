import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border-2 border-primary/30 bg-card px-3 py-2 text-base text-primary/90 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary/80 focus-visible:shadow-neon-green disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
