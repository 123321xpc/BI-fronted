import classNames from 'classnames';
import React, { ReactNode, useMemo } from 'react';
import './index.less';

type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

interface MyFlexProps {
  vertical?: boolean;
  space?: boolean;
  width?: number;
  height?: number;
  padding?: number;
  paddingRow?: number;
  justify?: Justify;
  align?: Align;
  board?: boolean;
  className?: string;
  children?: ReactNode;
}

const MyFlex: React.FC<MyFlexProps> = ({
  vertical,
  space,
  width,
  height,
  padding,
  paddingRow,
  justify = 'space-between',
  align = 'center',
  board,
  className,
  children,
}) => {
  const computedClass = useMemo(() => {
    return classNames(
      'my-flex',
      vertical ? 'flex-column' : 'flex-row',
      `flex-justify-${justify}`,
      `flex-align-${align}`,
      {
        'flex-gap': space,
        'flex-board': board,
        [`w-${width}`]: width !== undefined,
        [`h-${height}`]: height !== undefined,
        [`p-${padding}`]: padding !== undefined,
        [`pr-${paddingRow}`]: paddingRow !== undefined,
      },
      className,
    );
  }, [
    vertical,
    space,
    width,
    height,
    padding,
    paddingRow,
    justify,
    align,
    board,
    className,
  ]);

  return <div className={computedClass}>{children}</div>;
};

export default MyFlex;
