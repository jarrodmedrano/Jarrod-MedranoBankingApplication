function DepositForm() {
  const ctxCurrent = React.useContext(CurrentUserContext);

  const [status, setStatus] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(
    ctxCurrent?.currentUser?.balance || 0
  );
  const ctx = React.useContext(UserContext);

  useEffect(() => {
    if (ctxCurrent?.currentUser) {
      console.log("the current", ctxCurrent?.currentUser);
      setTotalState(ctxCurrent?.currentUser?.balance || 0);
      ctx.updateUser(ctxCurrent?.currentUser);
    }
  }, [ctxCurrent?.currentUser]);

  useEffect(() => {
    if (!deposit) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formValid, deposit]);

  useEffect(() => {
    if (status != "") {
      setTimeout(() => setStatus(""), 3000);
    }
  }, [status]);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setFormValid(false);
      return false;
    }

    if (!/^-?\d+\.?\d*$/.test(field)) {
      setStatus("Error: " + label + " must be a number");
      setFormValid(false);
      return false;
    }
    return true;
  }

  function clearForm() {
    setDeposit("");
    setTotalState(ctxCurrent?.currentUser?.balance || 0);
    setStatus("");
  }

  const handleChange = (event) => {
    if (Number(event.target.value) <= 0) {
      setStatus("Error: deposit must be a positive number");
      return setFormValid(false);
    } else if (!/^-?\d+\.?\d*$/.test(Number(event.target.value))) {
      setStatus("Error: deposit must be a number");
      return setFormValid(false);
    } else {
      setDeposit(Number(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    if (!validate(deposit, "deposit")) return;
    let newTotal = totalState + deposit;
    console.log("curren", { ...ctxCurrent.currentUser, balance: newTotal });
    ctxCurrent.setCurrentUser({ ...ctxCurrent.currentUser, balance: newTotal });
    // setTotalState(newTotal);
    setStatus(`Deposited $${deposit} successfully`);
    setFormValid(false);
    event.preventDefault();
  };

  return (
    <>
      Balance: ${totalState}
      <form>
        <div className="form-group">
          <input
            type="input"
            className="form-control"
            id="deposit"
            placeholder="Enter deposit amount"
            value={deposit}
            onChange={handleChange}
          />
          <button
            disabled={!formValid}
            type="submit"
            className="btn btn-light"
            onClick={handleSubmit}
          >
            Deposit
          </button>
          <button
            disabled={!formValid}
            type="button"
            className="btn btn-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
        {status}
      </form>
    </>
  );
}
