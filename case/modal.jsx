import { Modal } from "antd";

const Home = () => {
  return (
    <Modal
      visible={isRiskRulesVisible}
      width={1200}
      title="警告"
      onCancel={this.handleCloseRiskRules}
      footer={<>
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
      </>}>
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
