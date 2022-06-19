function AllUsers(props) {
  const ctx = React.useContext(UserContext);

  return (
    <>
      {ctx?.userData?.users?.map((user) => {
        return (
          <Card
            key={user.email}
            txtcolor="black"
            header={user.name}
            body={
              <ul>
                <li>email: {user.email}</li>
                <li>balance: {user.balance}</li>
              </ul>
            }
          />
        );
      })}
    </>
  );
}
