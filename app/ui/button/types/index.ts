import type { ComponentProps, ElementType } from 'react';

export type ButtonCommonProps<E extends ElementType = ElementType> = {
  children: React.ReactNode;
  className?: string;
};

export type ButtonOwnProps<E extends ElementType = ElementType> =
  ButtonCommonProps & {
    icon?: React.ReactNode;
    as?: E;
  };

export type ButtonPrimaryProps = ButtonCommonProps & {
  primary: boolean;
  secondary?: never;
};

export type ButtonSecondaryProps = ButtonCommonProps & {
  secondary: boolean;
  primary?: never;
};

export type ButtonVariantProps = ButtonPrimaryProps | ButtonSecondaryProps;

// polymorphism
export type ButtonProps<E extends ElementType> = ButtonCommonProps<E> &
  Omit<ComponentProps<E>, keyof ButtonCommonProps> &
  Partial<ButtonVariantProps> &
  Partial<ButtonOwnProps<E>>;
