import { Button, Form, Input, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect } from 'react';
import useHttp from '..';
import { getList } from './services/Demo1Services';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const App: React.FC = () => {
  const [data, getData, status] = useHttp({
    fetchFn: getList,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  const onFinish = () => {
    const val = form.getFieldsValue();
    getData(val);
  };

  const onReset = () => {
    form.resetFields();
    getData();
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name">
          <Input placeholder="请输入姓名查询" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="submit" type="primary" loading={status.pending}>
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} loading={status.pending} />
    </>
  );
};

export default App;
