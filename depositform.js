function DepositForm() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const [formValid, setFormValid] = React.useState(false);
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [validTransaction, setValidTransaction] = React.useState(false);

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    if (!deposit) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [formValid, deposit]);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setFormValid(false);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    if (!/^-?\d+\.?\d*$/.test(field)) {
      setStatus("Error: " + label + " must be a number");
      setFormValid(false);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function clearForm() {
    setDeposit("");
    setTotalState(0);

    setShow(true);
  }

  const handleChange = (event) => {
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    if (!validate(deposit, "deposit")) return;
    let newTotal = totalState + deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  return (
    <>
      Balance: {totalState}
      <form>
        <div className="form-group">
          <input
            type="number"
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
