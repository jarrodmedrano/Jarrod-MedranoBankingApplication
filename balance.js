function Balance() {
  const ctxCurrent = React.useContext(CurrentUserContext);

  return (
    <Card
      bgcolor="primary"
      header="Balance"
      body={`Total Balance: $${ctxCurrent.currentUser.balance}`}
    />
  );
}
