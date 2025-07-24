import MyFlex from '@/components/MyFLex';

type Props = {
  options: {
    key: string;
    click?: (params?: any) => void;
    text?: string;
    color?: string;
    component?: React.ReactNode;
    hide?: boolean;
  }[];
};

const Operators = ({ options }: Props) => {
  const filteredOptions = options.filter((option) => !option.hide);
  return (
    <MyFlex space width={'fit-content'}>
      {filteredOptions.map((opt) => {
        const { key, click, text, component, color } = opt;

        return component ? (
          <div key={key}>{opt.component}</div>
        ) : (
          <a key={key} onClick={click} style={color ? { color } : undefined}>
            {text}
          </a>
        );
      })}
    </MyFlex>
  );
};

export default Operators;
