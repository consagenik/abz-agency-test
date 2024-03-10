import React from 'react';
import './Text.styles.scss';

interface TextProps {
  text: string
  color?: 'black' | 'white'
}

export default function Text({text, color = 'black'}: TextProps) {
  return (
    <p className={`text ${color}Text`}>{text}</p>
  );
}
