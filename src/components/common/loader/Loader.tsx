import React from 'react';
import { ColorRing } from 'react-loader-spinner';

import './Loader.styles.scss';

interface LoaderProps {
  size?: number
  color?: string
}

export default function Loader({size = 48, color = '#00BDD3'} : LoaderProps) {
  return (
    <ColorRing visible={true} wrapperClass="loader" colors={[color, color, color, color, color]} height={size} width={size} />
  );
}
