import { InputHTMLAttributes, useId } from 'react';

import { cn } from '../lib/utils';

type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>;

const Toggle = ({ id, style, className, ...inputProps }: ToggleProps) => {
  const inputId = useId() || id;

  return (
    <label
      htmlFor={inputId}
      style={style}
      className={cn('cursor-pointer flex w-10 h-6 border-2 rounded-full relative items-center p-1', className)}
    >
      <input id={inputId} type='checkbox' className='hidden' {...inputProps} />
      <div className='w-4 h-4 border-2 border-primary rounded-full absolute transition-all [input:checked+&]:left-auto [input:checked+&]:translate-x-[80%] [input:checked+&]:bg-primary' />
    </label>
  );
};

export { Toggle };

