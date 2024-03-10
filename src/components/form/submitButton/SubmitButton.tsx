import React from 'react';

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  disabled?: boolean,
}

const SubmitButton:React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  isLoading,
  isError,
  disabled,
}) => (
  <button type="submit" onClick={onClick} disabled={isLoading || disabled} className={disabled ? 'disabled' : ''}>
    {text}
    {isError && <p>Something went wrong</p>}
  </button>
);

export default SubmitButton;
