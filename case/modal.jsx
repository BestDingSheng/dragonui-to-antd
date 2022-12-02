import { Modal } from "dragon-ui";

const Home = () => {
  return (
    <Modal visible={modal} width="1250">
      <Modal.Header
        title="银行账户信息维护"
        onClose={() => {
          this.setState({ modal: false, modify: false });
        }}
      />
      <Loading visible={this.state.bankModelLoading}>
        <Modal.Body
          className="page-claim"
          style={{ paddingTop: 20, height: 400 }}
        >
          {/* 银行组件 */}
          <Backlnfo
            isState
            dataSource={bankInfo.externalFields}
            titleS="TPA回盘附加账户信息"
          />
          <BankCom
            isMask={isMask}
            ref={(node) => {
              this.bankInfoDom = node;
            }}
            callBack={(bankInfo) => {
              this.handlerBankCallBack(bankInfo);
            }}
            bankInfo={bankInfo}
            {...this.props}
          />
          {/* 当赔付金额大于等于10000的时候才显示 */}
          {this.returnContainerCom()}
        </Modal.Body>
      </Loading>
      <Modal.Footer style={{ display: isReadOnly ? "none" : "block" }}>
        <Button
          isDisabled={this.state.mhLoading}
          onClick={() => {
            this.setState({ modal: false, modify: false });
          }}
        >
          取消
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
