import { SelectOptionType } from '@/types';

type EnumItem = {
  label?: string;
  value: string | number;
  name?: string;
  color?:
    | 'success'
    | 'error'
    | 'processing'
    | 'blue'
    | 'purple'
    | 'cyan'
    | string;
  disabled?: boolean;
};

type NormalizedEnumItem<K extends string> = {
  label: string;
  value: string | number;
  name: string;
  color: string;
  disabled: boolean;
};

type NormalizeEnumData<T extends Record<string, EnumItem>> = {
  [K in keyof T]: NormalizedEnumItem<Extract<K, string>>;
};

type EnumMethods<T extends Record<string, EnumItem>> = {
  getLabel: (value: string | number) => string | undefined;
  getOptions: () => SelectOptionType[];
  getItem: (value: string | number) => NormalizedEnumItem<string> | undefined; // ✅ 新增
};

export function createEnum<T extends Record<string, EnumItem>>(
  data: T,
): NormalizeEnumData<T> & EnumMethods<T> {
  const result = {} as NormalizeEnumData<T>;

  for (const key in data) {
    const item = data[key];
    const label = item.label ?? item.name ?? key;
    const name = item.name ?? key;
    const value = item.value;
    const color = item.color ?? 'black';
    const disabled = item.disabled ?? false;
    (result as any)[key] = { label, name, value, color, disabled };
  }

  const values = Object.values(result);

  // ✅ 根据 value 获取 label
  const getLabel = (value: string | number): string | undefined =>
    values.find((i) => i.value === value)?.label;

  // ✅ 获取下拉选项
  const getOptions = () =>
    values.map((i) => ({
      label: i.label,
      value: i.value,
      disabled: i.disabled,
    }));

  // ✅ 根据 value 获取完整对象
  const getItem = (
    value: string | number,
  ): NormalizedEnumItem<string> | undefined =>
    values.find((i) => i.value === value);

  return {
    ...result,
    getLabel,
    getOptions,
    getItem,
  };
}

// ✅ 使用示例
export const RESULT = createEnum({
  SUCCESS: {
    label: 'Success',
    value: 0,
    name: 'success',
    color: '#00C851',
  },
  FAILURE: {
    label: 'Failure',
    value: 1,
    name: 'failure',
    color: '#FF5252',
  },
});
