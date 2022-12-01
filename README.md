# dragonui-to-antd

是一个把 dragonui 转换成 antd 的 vscode 插件

## 如何使用

到需要转换的文件上点击右键点击, 选中 `dragon-ui to antd` 菜单选项即可

## 已支持的组件

- Panel
- Button
- Modal
  - 如果 modal 上有解构的属性的话，那就不支持 替换

## 案列

Button 转换前

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

Panel 转换前

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

Modal 替换前

```jsx
import { Modal } from "dragon-ui";

const Home = () => {
  return (
    <Modal visible={isRiskRulesVisible} width={1200}>
      <Modal.Header title="警告" onClose={this.handleCloseRiskRules} />
      <Modal.Body>
        <NewRiskRulesCollapse
          isDataEntry
          isCloseCase
          billInfo={this.billInfo}
          caseInfoDom={this.caseInfoDom}
          riskRules={riskRules}
          updateFlg={updateFlg}
        />
      </Modal.Body>
      <Modal.Footer>
        {hasErrorRules && [
          <Button onClick={this.handleCloseRiskRules}>返回</Button>,
        ]}
        {!hasErrorRules && [
          <Button key="cancel" onClick={this.handleCloseRiskRules}>
            取消
          </Button>,
          <Button
            key="confirm"
            theme="info"
            onClick={this.handleConfirmRiksRules}
          >
            确认
          </Button>,
        ]}
      </Modal.Footer>
    </Modal>
  );
};
```

替换后

```jsx
import { Modal } from "antd";

const Home = () => {
  return (
    <Modal
      visible={isRiskRulesVisible}
      width={1200}
      title="警告"
      onCancel={this.handleCloseRiskRules}
      footer={
        <>
          {hasErrorRules && [
            <Button onClick={this.handleCloseRiskRules}>返回</Button>,
          ]}
          {!hasErrorRules && [
            <Button key="cancel" onClick={this.handleCloseRiskRules}>
              取消
            </Button>,
            <Button
              key="confirm"
              theme="info"
              onClick={this.handleConfirmRiksRules}
            >
              确认
            </Button>,
          ]}
        </>
      }
    >
      <NewRiskRulesCollapse
        isDataEntry
        isCloseCase
        billInfo={this.billInfo}
        caseInfoDom={this.caseInfoDom}
        riskRules={riskRules}
        updateFlg={updateFlg}
      />
    </Modal>
  );
};
```
