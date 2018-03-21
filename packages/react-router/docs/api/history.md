# history

本文档中的 “history” 以及 “`history`对象”指的是 [`history` 包](https://github.com/ReactTraining/history)中的内容，该包是 React Router 仅有的两大主要依赖之一（除去 React 本身），在不同的 Javascript 环境中，它提供多种不同的形式来实现对 session 历史的管理。

我们也会使用以下术语：

- “browser history” - 在特定 DOM 上的实现，使用于支持 HTML5 history API 的 web 浏览器中
- “hash history” - 在特定 DOM 上的实现，使用于旧版本的 web 浏览器中
- “memory history” - 在内存中的 history 实现，使用于测试或者非 DOM 环境中，例如 React Native

`history` 对象通常会具有以下属性和方法：

- `length` - (number 类型) history 堆栈的条目数  
- `action` - (string 类型) 当前的操作(`PUSH`, `REPLACE`, `POP`)
- `location` - (object 类型) 当前的位置。location 会具有以下属性：
  - `pathname` - (string 类型) URL 路径
  - `search` - (string 类型) URL 中的查询字符串
  - `hash` - (string 类型) URL 的哈希片段
  - `state` - (object 类型) 提供给例如使用 `push(path, state)` 操作将 location 放入堆栈时的特定 location 状态。只在浏览器和内存历史中可用。
- `push(path, [state])` - (function 类型) 在 history 堆栈添加一个新条目
- `replace(path, [state])` - (function 类型) 替换在 history 堆栈中的当前条目
- `go(n)` - (function 类型) 将 history 堆栈中的指针调整 `n`
- `goBack()` - (function 类型) 等同于 `go(-1)`
- `goForward()` - (function 类型) 等同于 `go(1)`
- `block(prompt)` - (function 类型) 阻止跳转。(详见 [history 文档](https://github.com/ReactTraining/history#blocking-transitions))。

## history 是可变的

history 对象是可变的，因此我们建议从 [`<Route>`](./Route.md) 的渲染选项中来访问 [`location`](./location.md)，而不是从 `history.location` 直接获取。这样做可以保证 React 在生命周期中的钩子函数正常执行，例如：

```jsx
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // locationChanged 将为 true
    const locationChanged = nextProps.location !== this.props.location

    // INCORRECT，因为 history 是可变的所以 locationChanged 将一直为 false
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```

取决于你在使用的不同的实现，可能会出现其他属性。更多详情请参考 [history 文档](https:github.comReactTraininghistory)。