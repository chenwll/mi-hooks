import { isFunction } from 'lodash';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  fetchFn: any;
  params?: any;
  defaultKey?: string;
  defaultRes?: any;
  initialRes?: any;
  filterList?: (list: any) => void;
  debounceTime?: number;
}

type Status = {
  success: boolean;
  pending: boolean;
  done: boolean;
  error: boolean;
}; // 异步状态

export default (props: Props) => {
  const { fetchFn, params, defaultRes, initialRes, filterList, debounceTime } =
    props;

  const [list, setList] = useState(defaultRes || []);
  const [status, setStatus] = useState<Status>({
    success: false,
    pending: false,
    done: false,
    error: false,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    defaultRes && setList(defaultRes);
  }, []);

  // TODO defaultRes可能异步获取
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    initialRes && setList(initialRes);
  }, [initialRes]);

  const getList = useCallback(
    debounce((data: any) => {
      setStatus({ ...status, pending: true });
      fetchFn({ ...params, ...data })
        .then((res: Record<string, any>) => {
          if (isFunction(filterList)) {
            setList(filterList(res));
          } else {
            setList(res);
          }
          setStatus({ ...status, pending: false, success: true });
        })
        .catch(() => {
          setStatus({ ...status, pending: false, error: true });
        });
    }, debounceTime || 300),
    [fetchFn, filterList, params, status],
  );

  return [list, getList, status, setList];
};
