import React from 'react';

import './RadioFieldsGroup.styles.scss';
import {RadioField} from "../radioField";

interface RadioFieldsGroupProps {
  name: string;
  value: number;
  data: any[];
  onChange: (key: string, value: number) => void;
  label?: string;
}

export default function RadioFieldsGroup({name, label, value, data, onChange}: RadioFieldsGroupProps) {
  return (
    <div className="radioFieldsGroup">
      {label && <p className="label">{label}</p>}

      <div className="fieldsList">
        {data.map((item) => (
          <RadioField
            id={item.id}
            key={item.id}
            label={item.name}
            name={item.name}
            value={item.id === value}
            onChange={() => onChange(name, item.id)}
          />
        ))}
      </div>
    </div>
  );
}
