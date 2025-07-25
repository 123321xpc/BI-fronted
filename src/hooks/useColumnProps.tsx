import { ProColumns } from '@ant-design/pro-components';
import { useMemo } from 'react';

export type ColumnsType = {
  [key: string]: Omit<ProColumns, 'dataIndex'>;
};

export const useColumnProps = (props: ColumnsType): ProColumns[] => {
  return useMemo(() => {
    return Object.keys(props).map((key) => {
      return {
        dataIndex: key,
        ...props[key],
      } as ProColumns;
    });
  }, [props]);
};
