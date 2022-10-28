import type { NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

import type { ImageContainerProps } from '@/types/_root';

const ImageContainer: NextPage<ImageContainerProps> = (props) => {
  const { src, alt, width, height, className, ...rest } = props;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  );
};

export default ImageContainer;
