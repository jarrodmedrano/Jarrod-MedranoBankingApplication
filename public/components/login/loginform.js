const { useEffect } = React;

function LoginForm() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const ctxCurrent = React.useContext(CurrentUserContext);

  const [formValid, setFormValid] = React.useState(false);

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    if (!email && !password) {
      setFormValid(false);
    } else if (email && password) {
      setFormValid(true);
    }
  }, [formValid, email, password]);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setFormValid(false);
      return false;
    }
    return true;
  }

  function validatePassword(field, label) {
    if (!/^.{8,50}$/.test(field)) {
      setStatus("Error: " + label + " must be at least 8 characters");
      setFormValid(false);
      return false;
    }

    return true;
  }

  async function handleLogin() {
    ctx.getAllUsers();

    if (!validate(email, "email")) return;
    ctx.loginUser({
      email,
      password,
    });
    setShow(false);
  }

  function handleLogout() {
    if (!validate(email, "email")) return;
    if (!validatePassword(password, "password")) return;

    ctx.logoutUser({
      email,
      password,
    });
    setShow(true);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  React.useEffect(() => {
    ctx.getAllUsers();
  }, []);

  return show ? (
    <>
      <div className="form-group">
        Email address
        <br />
        <input
          type="input"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button
          disabled={!formValid}
          type="submit"
          className="btn btn-light"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      {status}
    </>
  ) : (
    <>
      <h5>Success</h5>
      <p>You are now logged in as {ctxCurrent?.currentUser?.name}.</p>
      <div className="form-group">
        <button type="submit" className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
