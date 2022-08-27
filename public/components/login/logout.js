function Logout() {
  const ctxCurrent = React.useContext(CurrentUserContext);

  return (
    <Card
      txtcolor="black"
      header={`You are already logged in as ${ctxCurrent.currentUser.email}`}
      body={
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => ctxCurrent.setCurrentUser(null)}
        >
          Log Out
        </button>
      }
    />
  );
}
