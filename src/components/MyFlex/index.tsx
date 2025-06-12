import React from 'react';
import styles from './index.less';

interface MyFlexProps {
  children?: React.ReactNode;
  vertical?: boolean;
  space?: boolean;
  width?: number;
  height?: number;
  padding?: number;
  paddingRow?: number;
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  board?: boolean;
  className?: string;
}

export const MyFlex: React.FC<MyFlexProps> = ({
  children,
  vertical,
  space,
  width,
  height,
  padding,
  paddingRow,
  justify = 'space-between',
  align = 'center',
  board,
  className = '',
}) => {
  const classNames: string[] = [];

  classNames.push(styles['my-flex']);
  classNames.push(styles[vertical ? 'flex-column' : 'flex-row']);
  classNames.push(styles[`flex-justify-${justify}`]);
  classNames.push(styles[`flex-align-${align}`]);

  if (space) classNames.push(styles['flex-gap']);
  if (board) classNames.push(styles['flex-board']);
  if (width !== undefined) classNames.push(styles[`w-${width}`]);
  if (height !== undefined) classNames.push(styles[`h-${height}`]);
  if (padding !== undefined) classNames.push(styles[`p-${padding}`]);
  if (paddingRow !== undefined) classNames.push(styles[`pr-${paddingRow}`]);

  if (className) classNames.push(className);

  return <div className={classNames.join(' ')}>{children}</div>;
};
