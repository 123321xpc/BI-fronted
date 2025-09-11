import { Flex as AntdFlex, FlexProps } from 'antd';
import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';
import './index.less';

export type MyFlexProps = {
  /**
   * @description 设置容器宽度
   */
  width?: number | string;

  /**
   * @description 设置容器高度
   */
  height?: number | string;

  /**
   * @description 设置容器内边距（四个方向）
   */
  padding?: number;

  /**
   * @description 设置左右方向的内边距（优先级高于 padding）
   */
  paddingRow?: number;

  /**
   * @description 设置容器外边距（四个方向）
   */
  margin?: number;

  /**
   * @description 设置上外边距
   */
  marginTop?: number;

  /**
   * @description 设置左外边距
   */
  marginLeft?: number;

  /**
   * @description 是否显示边框和圆角
   */
  board?: boolean;

  /**
   * @description link 的 hover 效果
   */
  link?: boolean;

  /**
   * @description 子组件内容
   */
  children?: ReactNode;
} & FlexProps;

const Flex: FC<MyFlexProps> = ({
  vertical,
  width,
  height,
  padding,
  paddingRow,
  margin,
  link,
  marginTop,
  marginLeft,
  justify = 'space-between',
  align = 'center',
  board,
  gap = 8,
  style,
  className,
  children,
  ...rest
}) => {
  const mergedStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,

    padding: padding !== undefined ? `${padding}px` : undefined,
    paddingLeft:
      paddingRow !== undefined
        ? `${paddingRow}px`
        : style?.paddingLeft ??
          (padding !== undefined ? `${padding}px` : undefined),
    paddingRight:
      paddingRow !== undefined
        ? `${paddingRow}px`
        : style?.paddingRight ??
          (padding !== undefined ? `${padding}px` : undefined),

    margin: margin !== undefined ? `${margin}px` : undefined,
    marginTop: marginTop !== undefined ? `${marginTop}px` : style?.marginTop,
    marginLeft:
      marginLeft !== undefined ? `${marginLeft}px` : style?.marginLeft,

    border: board ? '1px solid #e0e0e0' : undefined,
    borderRadius: board ? 6 : undefined,

    cursor: link ? 'pointer' : undefined,
    transition: 'all 0.3s',

    ...style,
  };

  const mergedClassName = classNames(className, { 'my-flex-link': link });

  return (
    <AntdFlex
      vertical={vertical}
      justify={justify}
      align={align}
      gap={gap}
      style={mergedStyle}
      className={mergedClassName}
      {...rest}
    >
      {children}
    </AntdFlex>
  );
};

export default Flex;
