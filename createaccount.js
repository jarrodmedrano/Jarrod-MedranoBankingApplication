const { useEffect } = React;

function CreateAccount() {
  const ctxCurrent = React.useContext(CurrentUserContext);

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [formValid, setFormValid] = React.useState(false);

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    if (!email && !password && !name) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formValid, email, password, name]);

  useEffect(() => {
    if (status !== "") {
      setTimeout(() => setStatus(""), 3000);
    }
  }, [status]);

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

  function handleCreate() {
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validatePassword(password, "password")) return;
    ctx.addUser({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return ctxCurrent.currentUser ? (
    <Logout />
  ) : (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
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
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <h5>Success</h5>
            </div>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
