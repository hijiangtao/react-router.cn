# React Router Config

React Router 的静态路由配置助手。

这是阿尔法软件，它需要：

1. 数据预加载的真实服务器渲染示例
2. 导航示例

## 安装

运用 [npm](https://www.npmjs.com/):

    $ npm install --save react-router-config

然后使用像 [webpack](https://webpack.github.io/) 这样的模块打包工具，像你使用其他工具一样：

```js
// using an ES6 transpiler, like babel
import { matchRoutes, renderRoutes } from "react-router-config";

// not using an ES6 transpiler
var matchRoutes = require("react-router-config").matchRoutes;
```

UMD 版本也可在 [unpkg](https://unpkg.com) 上得到：

```html
<script src="https://unpkg.com/react-router-config/umd/react-router-config.min.js"></script>
```

你可以在 `window.ReactRouterConfig` 上找到这个库

## 动机(Motivation)

随着 React Router v4 的推出，不再有一个集中的路由配置。有一些示例可以了解所有应用程序的潜在 routes ，例如：

* 从服务器加载数据或者在声明周期之前渲染下一屏幕
* 通过 name 链接 routes
* 静态分析

这个 project 旨在为其他( routes )定义一个共享格式来构建模式。

## Route Configuration Shape

Routes 是与 `<Route>` 具有相同属性的对象，但有一些区别：

* 只接受 `component` 属性 ( 不接受 `render` 或 `children` )
* 引入 `routes` key (键) 给子 routes
* 使用者可以自由添加任何他们想要的 route 的其他 props ，你可以访问 `component` 里的 `props.route` ，这个对象 ( object ) 是用于渲染和匹配对象 ( object ) 的引用。
* 当从具有相同组件和相同 `key` prop 的 route 进行转换时接受 `key` prop 以防止重载组件

```js
const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/child/:id",
        component: Child,
        routes: [
          {
            path: "/child/:id/grand-child",
            component: GrandChild
          }
        ]
      }
    ]
  }
];
```

**注意**：就像 `<Route>` 一样，相对路径还没有被支持。当它被支持时，它将在这里得到支持。

## API

### `matchRoutes(routes, pathname)`

返回一个匹配 routes 的数组。

#### 参数

* routes - route 配置
* pathname - [pathname](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname) 组件的 url。必须为字符串类型的路径。

```js
import { matchRoutes } from "react-router-config";
const branch = matchRoutes(routes, "/child/23");
// using the routes shown earlier, this returns
// [
//   routes[0],
//   routes[0].routes[1]
// ]
```

数组中的每项都包含两个属性：`routes` 和 `match`。

* `routes`：用于匹配 routes 数组
* `match`： 传递给 `<Route>` 对象的渲染方法

```js
branch[0].match.url;
branch[0].match.isExact;
// etc.
```

你可以使用此分支路径来确定在实际渲染之前将渲染什么。你可以在服务器上渲染之前，或在组件的生命周期挂钩，包装你的整个应用程序

```js
const loadBranchData = (location) => {
  const branch = matchRoutes(routes, location.pathname)

  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null)
  })

  return Promise.all(promises)
}

// useful on the server for preloading data
loadBranchData(req.url).then(data => {
  putTheDataSomewhereTheClientCanFindIt(data)
})

// also useful on the client for "pending navigation" where you
// load up all the data before rendering the next page when
// the url changes

// THIS IS JUST SOME THEORETICAL PSEUDO CODE :)
class PendingNavDataLoader extends Component {
  state = {
    previousLocation: null
  }

  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location
    const { routes } = this.props

    if (navigated) {
      // save the location so we can render the old screen
      this.setState({
        previousLocation: this.props.location
      })

      // load data while the old screen remains
      loadNextData(routes, nextProps.location).then((data) => {
        putTheDataSomewhereRoutesCanFindIt(data)
        // clear previousLocation so the next screen renders
        this.setState({
          previousLocation: null
        })
      })
    }
  }

  render() {
    const { children, location } = this.props
    const { previousLocation } = this.state

    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return (
      <Route
        location={previousLocation || location}
        render={() => children}
      />
    )
  }
}

// wrap in withRouter
export default withRouter(PendingNavDataLoader)

/////////////
// somewhere at the top of your app
import routes from './routes'

<BrowserRouter>
  <PendingNavDataLoader routes={routes}>
    {renderRoutes(routes)}
  </PendingNavDataLoader>
</BrowserRouter>
```

再次，这是所有的伪代码。有很多方法可以使用数据和待定导航进行服务器呈现，但我们尚未解决。这里的要点是 `matchRoutes` 让你有机会在渲染生命周期外进行静态匹配。我们希望最终制作一个这种方法的演示应用程序。

### `renderRoutes(routes, extraProps = {}, switchProps = {})`

为了确保使用 `matchRoutes` 与渲染内部的渲染结果在同一个分支之外进行匹配，必须在组件内使用 `renderRoutes` 而不是 `<Route>`。你仍然可以渲染一个 `<Route>` ，但是知道它不会在渲染之外的 `matchRoutes` 中。

```js
import { renderRoutes } from "react-router-config";

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/child/:id",
        component: Child,
        routes: [
          {
            path: "/child/:id/grand-child",
            component: GrandChild
          }
        ]
      }
    ]
  }
];

const Root = ({ route }) => (
  <div>
    <h1>Root</h1>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

const Home = ({ route }) => (
  <div>
    <h2>Home</h2>
  </div>
);

const Child = ({ route }) => (
  <div>
    <h2>Child</h2>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes, { someProp: "these extra props are optional" })}
  </div>
);

const GrandChild = ({ someProp }) => (
  <div>
    <h3>Grand Child</h3>
    <div>{someProp}</div>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    {/* kick it all off with the root route */}
    {renderRoutes(routes)}
  </BrowserRouter>,
  document.getElementById("root")
);
```
