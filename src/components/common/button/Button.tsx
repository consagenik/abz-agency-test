import * as React from 'react';

interface ButtonProps {
  text: string
  onClick: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({text, onClick, type = 'button', disabled}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={disabled ? 'disabled' : ''}>{text}</button>
  );
}
