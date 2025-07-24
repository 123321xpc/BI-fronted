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
  space?: boolean | number;
  width?: number | string;
  height?: number | string;
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
        'flex-gap': space === true, // Only apply class when space is true
        'flex-board': board,
        [`p-${padding}`]: padding !== undefined,
        [`pr-${paddingRow}`]: paddingRow !== undefined,
      },
      className,
    );
  }, [vertical, space, padding, paddingRow, justify, align, board, className]);

  const style = useMemo(() => {
    const styleObj: React.CSSProperties = {};

    if (width !== undefined) {
      styleObj.width = typeof width === 'number' ? `${width}px` : width;
    }

    if (height !== undefined) {
      styleObj.height = typeof height === 'number' ? `${height}px` : height;
    }

    // Handle space prop
    if (space !== undefined && space !== false) {
      styleObj.gap = typeof space === 'number' ? `${space}px` : '8px';
    }

    return styleObj;
  }, [width, height, space]);

  return (
    <div className={computedClass} style={style}>
      {children}
    </div>
  );
};

export default MyFlex;
