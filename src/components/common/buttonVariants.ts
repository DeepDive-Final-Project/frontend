import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'text-[#E6E6E6] font-medium text-center rounded-full transition',
  {
    variants: {
      size: {
        sm: 'h-8 leading-8 px-4 text-sm rounded-full',
        basic: 'w-full h-12 px-5 py-3 text-base',
      },
      variant: {
        primary: 'bg-point-blue',
        secondary: 'bg-btn-gray',
        empty: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 'basic',
      variant: 'primary',
    },
  },
);
