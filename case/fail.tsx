import React from "react";
import { Panel, Modal, Button } from "dragon-ui";

const ReceiptInfo = ({ search }) => {
  return (
    <>
      <Panel>
        <Panel.Header>
          <Panel.Title>收件信息</Panel.Title>
          <Panel.More>
            <Button theme="info" isDisabled={loading} isDisabled={loading}>
              新增
            </Button>
          </Panel.More>
        </Panel.Header>
        <Panel.Body>
          <div>我是测试内容</div>
        </Panel.Body>
      </Panel>
      <Modal visible={visible} width="1250">
        <Modal.Header
          title="银行账户信息维护"
          onClose={() => {
            this.setState({ modal: false, modify: false });
          }}
        />
        <Modal.Body style={{ paddingTop: 20, height: 400 }}>
          <div>测试内容</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            isDisabled={this.state.isDisabled}
            onClick={() => {
              this.setState({ modal: false, modify: false });
            }}
          >
            取消
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiptInfo;
