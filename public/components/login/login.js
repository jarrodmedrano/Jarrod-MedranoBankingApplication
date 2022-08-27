function Login() {
  const ctxCurrent = React.useContext(CurrentUserContext);

  return ctxCurrent.currentUser ? (
    <Logout />
  ) : (
    <Card txtcolor="black" header="Login" body={<LoginForm />} />
  );
}
