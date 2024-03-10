import React from 'react';
import InputMask from 'react-input-mask';

import './Input.styles.scss';

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (key: string, value: string) => void;
  hint?: string;
  error?: string;
  extraClassName?: string;
}

export default function InputField({
  type,
  placeholder,
  name,
  value,
  onChange,
  hint,
  error,
  extraClassName
}: InputProps) {
  return (
    <div className={`inputWrapper${extraClassName ? ` ${extraClassName}` : ''}`}>
      <div className="inputField">
        <div className="material-textfield">
          {type === 'tel' && (
            <InputMask
              id={name}
              mask="+380999999999"
              name={name}
              value={value}
              placeholder="placeholder"
              onChange={(event) => onChange(name, event.target.value)}
            />
          )}

          {type !== 'tel' && (
            <input
              id={name}
              type={type}
              name={name}
              value={value}
              placeholder="placeholder"
              onChange={(event) => onChange(name, event.target.value)}
            />
          )}
          <label htmlFor={name}>{placeholder}</label>
        </div>
      </div>

      {hint && <p className="hint">{hint}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
