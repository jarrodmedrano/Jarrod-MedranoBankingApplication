function Balance() {
  const ctxCurrent = React.useContext(CurrentUserContext);

  return (
    <Card
      bgcolor="success"
      header="Balance"
      body={`Total Balance: $${ctxCurrent?.currentUser?.balance || 0}`}
    />
  );
}
