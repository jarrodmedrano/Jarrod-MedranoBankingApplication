function AllData() {
  const ctx = React.useContext(UserContext);
  return (
    <>
      <Card
        txtcolor="black"
        header="All Data in Store"
        status={status}
        body={JSON.stringify(ctx.users)}
      />
    </>
  );
}
