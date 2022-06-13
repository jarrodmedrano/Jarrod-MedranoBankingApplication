function WithdrawForm() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [formValid, setFormValid] = React.useState(false);
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const totalContext = React.useContext(TotalContext);

  useEffect(() => {
    clearForm();
  }, []);

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
    setTotalState(0);
    setStatus("");
    setShow(true);
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
    setTotalState(newTotal);
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
