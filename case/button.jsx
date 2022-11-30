const Button = () => {
  return (
    <Button
      theme="info"
      isLoading={ding}
      onClick={() => {
        this.setState({
          investigateTaskQuery: {
            pageSize: 10,
            currentPage: 1,
          },
        });
      }}
    >
      2134
    </Button>
  );
};
