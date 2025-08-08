import Flex from '@/components/Flex';
import { Button, ButtonProps } from 'antd';

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

type Props = {
  className?: string;
  style?: React.CSSProperties; // ✅ 仅用于容器
  childrenStyle?: React.CSSProperties; // ✅ 用于每个子组件
  options: ({
    key: string;
    text?: string;
    color?: Color;
    component?: React.ReactNode;
    hide?: boolean;
  } & Omit<ButtonProps, 'color'>)[];
  gap?: number;
  color?: Color;
} & Omit<ButtonProps, 'color'>;

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
        const finalColor = optColor || color;

        return component ? (
          <div key={key} style={childrenStyle}>
            {opt.component}
          </div>
        ) : (
          <Button
            key={key}
            variant={variant}
            {...objRest}
            {...(finalColor?.startsWith('#')
              ? { style: { ...childrenStyle, color: finalColor } }
              : { style: childrenStyle, color: finalColor as any })}
          >
            {text}
          </Button>
        );
      })}
    </Flex>
  );
};

export default Operators;
