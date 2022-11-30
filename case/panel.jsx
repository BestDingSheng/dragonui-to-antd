import { Panel } from "dragon-ui";

const Panel = () => {
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
        <Button
          theme="info"
          onClick={() => {
            this.setState({
              investigateTaskQuery: {
                pageSize: 10,
                currentPage: 1,
              },
            });
          }}
        >
          重置
        </Button>
      </Panel.Footer>
    </Panel>
  );
};

export default Panel;
