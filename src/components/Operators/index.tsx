import Flex from '@/components/Flex';
import { Button, ButtonProps } from 'antd';

/**
 * @description 颜色类型定义，可以是ant预设颜色字符串或任意自定义颜色（如 HEX）
 */
type Color =
  | 'default'
  | 'primary'
  | 'danger'
  | 'blue'
  | 'purple'
  | 'cyan'
  | 'green'
  | 'magenta'
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'volcano'
  | 'geekblue'
  | 'lime'
  | 'gold'
  | string;

/**
 * @description Operators 组件的参数类型定义
 */
type Props = {
  /** @description 外层容器的类名 */
  className?: string;
  /** @description 外层容器的样式 */
  style?: React.CSSProperties;
  /** @description 每个子按钮/组件的样式 */
  childrenStyle?: React.CSSProperties;
  /**
   * @description 操作项数组
   * - key: 唯一标识
   * - text: 按钮显示文字
   * - color: 自定义颜色（优先级高于全局 color）
   * - component: 自定义渲染组件（非按钮）
   * - hide: 是否隐藏该项
   * - 继承 ButtonProps 其他参数（去掉 color）
   */
  options: ({
    key: string | number;
    text?: string;
    color?: Color;
    component?: React.ReactNode;
    hide?: boolean;
  } & Omit<ButtonProps, 'color'>)[];
  /** @description 按钮或组件之间的间距，默认 8px */
  gap?: number;
  /** @description 全局默认颜色（被单个 option.color 覆盖） */
  color?: Color;
} & Omit<ButtonProps, 'color'>;

/**
 * @description 多操作按钮/组件布局组件
 */
const Operators = ({
  options,
  gap = 8,
  variant = 'link',
  color = 'primary',
  style,
  className,
  childrenStyle,
  ...rest
}: Props) => {
  const filteredOptions = options.filter((option) => !option.hide);

  return (
    <Flex gap={gap} width="fit-content" className={className} style={style}>
      {filteredOptions.map((opt) => {
        const { key, text, component, color: optColor, ...objRest } = opt;
        const finalColor = optColor || color; // 优先使用单项颜色

        // 如果是自定义组件，直接渲染
        return component ? (
          <div key={key} style={childrenStyle}>
            {opt.component}
          </div>
        ) : (
          // 否则渲染按钮
          <Button
            key={key}
            variant={variant}
            {...rest}
            {...objRest}
            {...(finalColor?.startsWith('#')
              ? { style: { ...childrenStyle, color: finalColor } }
              : { style: childrenStyle, color: finalColor as any })}
            style={{ ...childrenStyle, ...opt.style }}
          >
            {text}
          </Button>
        );
      })}
    </Flex>
  );
};

export default Operators;
