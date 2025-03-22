import { ElementType } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/common/buttonVariants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'basic';
  variant?: 'primary' | 'secondary' | 'empty';
  icon?: React.ReactNode;
  as?: ElementType;
  to?: string;
}

const Button = ({
  size = 'basic',
  variant = 'primary',
  icon,
  as: Component = 'button',
  to,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Component
      className={clsx(
        buttonVariants({ size, variant }),
        icon && 'flex items-center justify-center gap-2',
        Component === Link && 'block',
        className,
      )}
      {...(Component === Link ? { to } : {})}
      {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </Component>
  );
};

export default Button;
