import Flex, { MyFlexProps } from '@/components/Flex';
import { Button, ButtonProps } from 'antd';

/**
 * @description operators 组件的参数类型定义
 */
type Props = {
  /** @description 外层容器的类名 */
  className?: string;
  /** @description 外层容器的样式 */
  layout?: Omit<MyFlexProps, 'children'>;
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
    component?: React.ReactNode;
    hide?: boolean;
  } & ButtonProps)[];
  /** @description 按钮或组件之间的间距，默认 8px */
  gap?: number;
  /** @description 全局默认颜色（被单个 option.color 覆盖） */
} & ButtonProps;

/**
 * @description 多操作按钮/组件布局组件
 */
const Operators = ({
  options,
  layout,
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
    <Flex {...layout} gap={gap} className={className} style={style}>
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
            {...rest}
            {...objRest}
            color={finalColor}
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
