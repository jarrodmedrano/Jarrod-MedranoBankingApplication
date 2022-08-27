function AllData() {
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    ctx.getAllUsers();
  }, []);

  return (
    <>
      {ctx?.userData?.users.length > 0 === true ? (
        <AllUsers></AllUsers>
      ) : (
        <p>No Users Currently</p>
      )}
    </>
  );
}
