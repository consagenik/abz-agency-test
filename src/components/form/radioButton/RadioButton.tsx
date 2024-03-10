import React from 'react';

import './RadioButton.styles.scss';

export interface IRadioButtonProps {
  checked: boolean;
}

export default function RadioButton({checked}: IRadioButtonProps) {
  return (
    <div className={checked ? `radioButton checked` : `radioButton`}>
      <div className="circle"></div>
    </div>
  );
}
