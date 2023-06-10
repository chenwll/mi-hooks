---
title: useHttp
group:
  title: 业务类Hooks
  order: 0
---

# useHttp

## 何时使用

## API

`useHttp`可以用于发送请求，

### Result

| 参数    | 说明                                               | 类型         |
| ------- | -------------------------------------------------- | ------------ |
| list    | 请求之后返回的数据                                 | -            |
| getList | 执行该函数会再次发送一次请求，并且会更改 list 的值 | `() => void` |
| status  | 请求的状态                                         | Object       |
| setList | 改变 list 的值                                     | `() => void` |

### Params

| 参数         | 说明          | 类型    | 默认值 |
| ------------ | ------------- | ------- | ------ |
| fetchFn      | 请求函数      | Promise |
| params       | 参数          |
| defaultKey   |
| initialRes   | list 的初始值 |
| filterList   | 过滤函数      |
| debounceTime | 防抖时间      |

## 代码演示

<code src = "./Demo/Demo1.tsx"></code>
