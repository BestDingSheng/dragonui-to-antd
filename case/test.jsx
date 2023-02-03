import React from "react";
import { Button, Modal } from "antd";
import Card from "@za/hfe-bops-card";

const Test = ({ search }) => {
  return (
    <>
      <Card
        title="收件信息"
        extra={
          <>
            <Button type="primary" disabled={loading} loading={loading}>
              新增
            </Button>
            <Button type="primary" disabled={loading} loading={loading}>
              删除
            </Button>
          </>
        }
      >
        <div>我是测试内容</div>
      </Card>
      <Modal
        visible={visible}
        width="1250"
        title="银行账户信息维护"
        onCancel={() => {}}
        footer={
          <>
            <Button>取消</Button>
            <Button type="primary">确定</Button>
          </>
        }
      >
        <div>测试内容</div>
      </Modal>
    </>
  );
};

export default Test;
