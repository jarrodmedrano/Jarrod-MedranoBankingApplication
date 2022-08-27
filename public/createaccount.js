const { useEffect } = React;

function CreateAccount() {
  const ctxCurrent = React.useContext(CurrentUserContext);
  const ctx = React.useContext(UserContext);

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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

  function validateName(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setFormValid(false);
      return false;
    }

    if (ctx.userData.users.find((id) => id.name === field)) {
      setStatus("Error: " + label + " is already used");
      setFormValid(false);
      return false;
    }
    return true;
  }

  function validateEmail(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setFormValid(false);
      return false;
    }

    if (ctx.userData.users.find((id) => id.email === field)) {
      setStatus("Error: " + label + " is already used");
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
    if (!validateName(name, "name")) return;
    if (!validateEmail(email, "email")) return;
    if (!validatePassword(password, "password")) return;

    ctx.addUser({ name, email, password });
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
