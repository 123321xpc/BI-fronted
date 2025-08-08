import { Flex as AntdFlex, FlexProps } from 'antd';
import React, { FC, ReactNode } from 'react';

type MyFlexProps = {
  width?: number | string; // 设置容器宽度
  height?: number | string; // 设置容器高度
  padding?: number; // 设置容器内边距（四个方向）
  paddingRow?: number; // 设置左右方向的内边距（覆盖 paddingLeft 和 paddingRight）
  margin?: number; // 设置容器外边距（四个方向）
  marginTop?: number; // 设置上外边距
  marginLeft?: number; // 设置左外边距
  board?: boolean; // 是否显示边框和圆角
  children?: ReactNode; // 子组件内容
} & FlexProps; // 合并 Ant Design Flex 的所有原始属性

const Flex: FC<MyFlexProps> = ({
  vertical,
  width,
  height,
  padding,
  paddingRow,
  margin,
  marginTop,
  marginLeft,
  justify = 'space-between', // 默认水平布局为 space-between
  align = 'center', // 默认垂直居中对齐
  board,
  gap = 8, // 默认元素间距为 8px
  className,
  style,
  children,
}) => {
  // 合并自定义样式和传入的 style，对组件尺寸和边距进行统一处理
  const mergedStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,

    // 内边距：优先使用 paddingRow 设置左右内边距
    padding: padding !== undefined ? `${padding}px` : undefined,
    paddingLeft:
      paddingRow !== undefined ? `${paddingRow}px` : style?.paddingLeft,
    paddingRight:
      paddingRow !== undefined ? `${paddingRow}px` : style?.paddingRight,

    // 外边距处理
    margin: margin !== undefined ? `${margin}px` : undefined,
    marginTop: marginTop !== undefined ? `${marginTop}px` : style?.marginTop,
    marginLeft:
      marginLeft !== undefined ? `${marginLeft}px` : style?.marginLeft,

    // 是否添加边框和圆角
    border: board ? '1px solid #e0e0e0' : undefined,
    borderRadius: board ? 6 : undefined,

    // 合并传入的其他样式（优先级最低）
    ...style,
  };

  return (
    <AntdFlex
      vertical={vertical}
      justify={justify}
      align={align}
      gap={gap}
      className={className}
      style={mergedStyle}
    >
      {children}
    </AntdFlex>
  );
};

export default Flex;
