import { act, renderHook } from '@testing-library/react';
import useHttp from '../index';

// interface Query {
//     name:'string';
// }

describe('useHttp', () => {
  const asyncFn = () => {
    return Promise.resolve({
      list: [],
    });
  };
  // let searchType = 'name';

  const form: any = {
    fieldsValue: {},
    getFieldsValue() {
      return this.fieldsValue;
    },
    setFieldsValue(values: object) {
      this.fieldsValue = {
        ...this.fieldsValue,
        ...values,
      };
    },
    resetFields() {
      this.fieldsValue = {};
    },
  };

  let hook: any;

  const setUp = (options: any) => renderHook(() => useHttp(options));

  it('should fetch first render', async () => {
    form.resetFields();
    act(() => {
      hook = setUp({
        fetchFn: asyncFn,
      });
    });
    const [data, , status] = hook;
    expect(data).toBe([]);
    expect(status.pending).toBe(true);
  });
});
