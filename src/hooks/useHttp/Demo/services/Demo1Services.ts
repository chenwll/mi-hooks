interface Params {
  name?: 'string';
}

const sleep = (time = 1000) => {
  return new Promise<void>((resolve) => {
    let timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, time);
  });
};

export const getList = (params: Params) => {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];
  return new Promise((resolve) => {
    if (!params) {
      resolve(data);
    }
    const { name = '' } = params;
    const res = data.filter((item) => {
      return item.name.includes(name);
    });
    sleep(1000).then(() => {
      resolve(res);
    });
  });
};
