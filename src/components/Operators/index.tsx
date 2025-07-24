import MyFlex from '@/components/MyFLex';
import { Button, ButtonProps } from 'antd';

type Props = {
  options: ({
    key: string;
    click?: (params?: any) => void;
    text?: string;
    color?:
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
    component?: React.ReactNode;
    hide?: boolean;
  } & Omit<ButtonProps, 'color'>)[];
  space?: number | boolean;
  color?:
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
} & Omit<ButtonProps, 'color'>;

const Operators = ({
  options,
  space = 0,
  variant = 'link',
  color = 'primary',
  ...rest
}: Props) => {
  const filteredOptions = options.filter((option) => !option.hide);
  return (
    <MyFlex space={space} width={'fit-content'}>
      {filteredOptions.map((opt) => {
        const {
          key,
          click,
          text,
          component,
          color: optColor,
          ...objRest
        } = opt;

        const finalColor = optColor || color;

        return component ? (
          <div key={key}>{opt.component}</div>
        ) : (
          <Button
            key={key}
            variant={variant}
            color={color as any}
            onClick={click}
            {...rest}
            {...objRest}
            {...(finalColor?.startsWith('#')
              ? { style: { color: finalColor } }
              : { color: finalColor as any })}
          >
            {text}
          </Button>
        );
      })}
    </MyFlex>
  );
};

export default Operators;
