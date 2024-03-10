import React from "react";
import './Title.styles.scss';

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6

interface TitleProps {
  text: string
  level?: TitleLevel
}

function renderTitle(text: string, level: TitleLevel) {
  switch (level) {
    case 1:
      return <h1>{text}</h1>;
    case 2:
      return <h2>{text}</h2>;
    case 3:
      return <h3>{text}</h3>;
    case 4:
      return <h4>{text}</h4>;
    case 5:
      return <h5>{text}</h5>;
    case 6:
      return <h6>{text}</h6>;
  }
}

export default function Title({text, level = 1}: TitleProps) {
  return (
    <div className="headerWrapper">
      {renderTitle(text, level)}
    </div>
  );
}
