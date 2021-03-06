function WithdrawForm() {
  const ctxCurrent = React.useContext(CurrentUserContext);
  const ctx = React.useContext(UserContext);

  const [status, setStatus] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [totalState, setTotalState] = React.useState(
    ctxCurrent?.currentUser?.balance || 0
  );
  const [validTransaction, setValidTransaction] = React.useState(false);

  useEffect(() => {
    if (ctxCurrent?.currentUser) {
      setTotalState(ctxCurrent?.currentUser?.balance || 0);
      ctx.updateUser(ctxCurrent?.currentUser);
    }
  }, [ctxCurrent?.currentUser]);

  useEffect(() => {
    if (!withdrawAmount) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formValid, withdrawAmount]);

  useEffect(() => {
    if (status != "") {
      setTimeout(() => setStatus(""), 3000);
    }
  }, [status]);

  function validate(field, label) {
    if (totalState - field < 0) {
      setStatus("Error: " + label + " is greater than account balance.");
      setFormValid(false);
      return false;
    }

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
    setWithdrawAmount("");
    setTotalState(ctxCurrent.currentUser.balance || 0);
    setStatus("");
  }

  const handleChange = (event) => {
    if (Number(event.target.value) <= 0) {
      setStatus("Error: withdraw must be a positive number");
      return setFormValid(false);
    } else if (!/^-?\d+\.?\d*$/.test(Number(event.target.value))) {
      setStatus("Error: withdraw must be a number");
      return setFormValid(false);
    } else {
      setWithdrawAmount(Number(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    if (!validate(withdrawAmount, "withdraw")) return;
    let newTotal = totalState - withdrawAmount;
    ctxCurrent.setCurrentUser({ ...ctxCurrent.currentUser, balance: newTotal });
    setStatus(`Withdrew $${withdrawAmount} successfully`);
    setValidTransaction(false);
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
            id="withdraw"
            placeholder="Enter withdraw amount"
            value={withdrawAmount}
            onChange={handleChange}
          />
          <button
            disabled={!formValid}
            type="submit"
            className="btn btn-light"
            onClick={handleSubmit}
          >
            Withdraw
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
