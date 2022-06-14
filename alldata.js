function AllData() {
  const ctx = React.useContext(UsersContext);
  return (
    <>
      <h5>All Data in Store</h5>
      {JSON.stringify(ctx.users)}
      <br />
    </>
  );
}
