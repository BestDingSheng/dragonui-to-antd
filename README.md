# dragonui-to-antd

是一个把 dragonui 转换成 antd 的 vscode 插件

## 如何使用

到需要转换的文件上点击右键点击, 选中 `dragon-ui to antd` 菜单选项即可

## 已支持的组件

- Panel
- Button

## 案列

转换前

```jsx
import { Button } from "dragon-ui";

const Home = () => {
  return (
    <Button theme="info" isDisabled={isDisabled} isLoading={loading}>
      123
    </Button>
  );
};
```

转换后

```jsx
import { Button } from "antd";

const Home = () => {
  return (
    <Button disabled={isDisabled} loading={loading}>
      123
    </Button>
  );
};
```

panel 转换前

```jsx
import { Panel } from "dragon-ui";

const Home = () => {
  return (
    <Panel className="investigateTask-form">
      <Panel.Header>
        <Panel.Title>调查复核查询条件</Panel.Title>
      </Panel.Header>
      <Panel.Body>
        <div>123</div>
      </Panel.Body>
      <Panel.Footer style={{ textAlign: "center" }}>
        <Button
          theme="info"
          isLoading={false}
          style={{ marginRight: 10 }}
          onClick={() => {
            this._handleSearch(true);
          }}
        >
          检索
        </Button>
      </Panel.Footer>
    </Panel>
  );
};

export default Home;
```

转换后

```jsx
import Card from "@za/hfe-bops-card";

const Home = () => {
  return (
    <Card
      className="investigateTask-form"
      title="调查复核查询条件"
      footer={
        <>
          <Button
            theme="info"
            isLoading={false}
            style={{ marginRight: 10 }}
            onClick={() => {
              this._handleSearch(true);
            }}
          >
            检索
          </Button>
        </>
      }
    >
      <div>123</div>
    </Card>
  );
};

export default Home;
```
