function AllData() {
  const ctx = React.useContext(UserContext);
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
