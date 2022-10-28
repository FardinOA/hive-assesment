import type { NextPage } from 'next';
import React from 'react';

import type { HeadingProps } from '../../../types/_root/index';

const Heading: NextPage<HeadingProps> = (props) => {
  const { variant, label, styleClass } = props;

  switch (variant) {
    case 'h1':
    case 'H1':
      return (
        <h1
          className={styleClass}
          style={{ fontSize: '32px', fontWeight: 'bolder' }}
        >
          {label}
        </h1>
      );
    case 'h2':
    case 'H2':
      return (
        <h2
          className={styleClass}
          style={{ fontSize: '24px', fontWeight: 'bolder' }}
        >
          {label}
        </h2>
      );
    case 'h3':
    case 'H3':
      return (
        <h3
          className={styleClass}
          style={{ fontSize: '17.72px', fontWeight: 'bolder' }}
        >
          {label}
        </h3>
      );
    case 'h4':
    case 'H4':
      return (
        <h4
          className={styleClass}
          style={{ fontSize: '16px', fontWeight: 'bolder' }}
        >
          {label}
        </h4>
      );
    case 'h5':
    case 'H5':
      return (
        <h5
          className={styleClass}
          style={{ fontSize: '13.28px', fontWeight: 'bolder' }}
        >
          {label}
        </h5>
      );
    case 'h6':
    case 'H6':
      return (
        <h6
          className={styleClass}
          style={{ fontSize: '10.72px', fontWeight: 'bolder' }}
        >
          {label}
        </h6>
      );

    default:
      return (
        <h1
          className={styleClass}
          style={{ fontSize: '16px', fontWeight: 'bolder' }}
        >
          {label}
        </h1>
      );
  }
};

export default Heading;
