/**
 *  案件信息备注
 *
 */
import React, { Component } from "react";
import StaticMessage from "components/Message";
import { Button, Panel, Input, Modal, Table } from "dragon-ui";
import { deleteRemark, addRemark } from "utils/actions";
import Tools from "utils/tools";
import Confirm from "components/Confirm";

// end
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delConfirm: {},
      remarkValue: "",
      remarkEditMolde: false,
      isAddStatus: null,
      operatorId: null,
    };

    this.COLUMNS = [
      {
        title: "备注",
        dataIndex: "remark",
        width: 200,
      },
      {
        title: "备注人",
        dataIndex: "operatorName",
        width: 200,
      },
      {
        title: "备注日期",
        dataIndex: "operateTime",
        width: 200,
      },
      {
        title: "操作",
        dataIndex: "trackingNo",
        width: 200,
        render: (val, row) => {
          const { isReadOnly, isMorePolicy, planCode } = this.props;
          const isBtnShow =
            isReadOnly || isMorePolicy !== undefined || planCode;
          let style = {
            display: isBtnShow ? "none" : "inline-block",
          };
          return (
            <div>
              <a
                href=" javaScript:;"
                style={{
                  marginRight: "10px",
                  ...style,
                }}
                onClick={() => this.handleChaneBrn(row)}
              >
                修改
              </a>
              <a
                href=" javaScript:;"
                style={{ ...style }}
                onClick={() => this.handleDelBtn(row)}
              >
                删除
              </a>
            </div>
          );
        },
      },
    ];
  }

  handleChaneBrn = (row) => {
    this.setState({
      isModify: true,
      remarkEditMolde: true,
      remarkValue: row.remark,
      isAddStatus: row.id,
      operatorId: row.operatorId,
    });
  };
  handleDelBtn = (row) => {
    let { delConfirm } = this.state;
    const { fetchFn } = this.props;
    delConfirm.visible = true;
    delConfirm.title = "提示";
    delConfirm.body = <div style={{ textAlign: "center" }}>是否删除</div>;
    delConfirm.onCancel = () => {
      delConfirm.visible = false;
      this.setState({ delConfirm });
    };
    delConfirm.onOk = () => {
      deleteRemark(row.id, (res) => {
        if (res.code === "0") {
          delConfirm.visible = false;
          this.setState({ delConfirm });
          fetchFn && fetchFn();
        }
      });
    };
    this.setState({
      delConfirm,
    });
  };

  handlerConfirmBtn = () => {
    const { remarkValue, isAddStatus, operatorId, delConfirm } = this.state;
    const { applyInfo, fetchFn } = this.props;
    const params = {
      businessType: "1",
      businessId: applyInfo.id,
      businessNo: applyInfo.reportNo,
      remark: remarkValue,
      id: isAddStatus,
      operatorId,
    };

    if (remarkValue.length === 0) {
      return StaticMessage.error("请输入备注");
    }
    // 如果是添加的时候删除operatorId字段
    if (!isAddStatus) {
      delete params.operatorId;
      delete params.id;
    }
    addRemark(
      params,
      (res) => {
        if (res.code == 0) {
          this.setState({
            remarkEditMolde: false,
            isAddStatus: null,
            operatorId: null,
          });
          fetchFn && fetchFn();
        }
      },
      () => {
        delConfirm.visible = false;
        this.setState({ delConfirm });
      }
    );
  };

  handlerCloseBtn = () => {
    this.setState({ remarkEditMolde: false });
  };

  render() {
    let { isReadOnly, isMorePolicy, remakList, isHidden } = this.props;
    let { remarkEditMolde, remarkValue, isAddStatus } = this.state;
    const queryUrl = Tools.breakUrl(location.href);
    /**
     *  添加按钮权限
     *  普通页面 录入和审核状态可以编辑
     *  滴滴页面 只有录入可以编辑
     *  queryUrl.status == undefined 是选定保单的状态
     *  isMorePolicy == ture 只有滴滴页面才会有这个属性
     *  isReadOnly 在审核状态和赔案查询进去的状态回传这个参数
     */
    const isBtnShow =
      isReadOnly || isMorePolicy !== undefined || queryUrl.status == undefined;
    const style = {};
    const isCustomerServiceEnquiry = Tools.isCustomerServiceEnquiry();

    if (isHidden) {
      style.display = "none";
    }
    if (isCustomerServiceEnquiry) {
      return null;
    }

    return (
      <div style={{ marginTop: "15px" }}>
        <Panel style={style}>
          <Panel.Header>
            <Panel.Title>备注列表</Panel.Title>
            <Panel.More>
              <Button
                theme="info"
                style={{
                  display: isBtnShow ? "none" : "inline",
                }}
                onClick={() => {
                  this.setState({
                    remarkEditMolde: true,
                    remarkValue: "",
                    isAddStatus: null,
                  });
                }}
              >
                新增案件备注
              </Button>
            </Panel.More>
          </Panel.Header>

          <Panel.Body>
            {queryUrl.status && (
              <Table
                striped
                radius
                dataSource={remakList || []}
                columns={this.COLUMNS}
              />
            )}
          </Panel.Body>
          <Confirm {...this.state.delConfirm} />
        </Panel>
        <Modal visible={remarkEditMolde} width="650">
          <Modal.Header
            title={`${isAddStatus ? "修改" : "添加"}备注`}
            onClose={this.handlerCloseBtn}
          />
          <Modal.Body>
            <div style={{ padding: "10px" }}>
              <div style={{ verticalAlign: "12px" }}>备注</div>
              <Input
                radius
                type="textarea"
                placeholder="请输入描述..."
                maxLength="500"
                style={{ width: 650 }}
                rows={15}
                defaultValue={remarkValue}
                value={remarkValue}
                onChange={(e) => {
                  let val = e.target.value.trim();
                  this.setState({
                    remarkValue: val,
                  });
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button theme="info" onClick={this.handlerCloseBtn}>
              取消
            </Button>
            <Button theme="info" onClick={this.handlerConfirmBtn}>
              确定
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Index;
