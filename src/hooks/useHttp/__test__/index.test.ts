import { act, renderHook } from '@testing-library/react';
import useHttp from '../index';

jest.mock('axios');
describe('useHttp', () => {
  it('挂载时调用', async () => {
    const resp = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
    ];
    const requestFn = () => {
      return Promise.resolve(resp);
    };
    const { result } = renderHook(() => useHttp({ fetchFn: requestFn }));
    const [list, getData] = result.current;
    expect(getData).toBeCalledTimes(0);
    act(result.current[1]);
    expect(list[0]).toEqual({
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    });
    expect(requestFn).toBeCalledTimes(1);
  });
});
