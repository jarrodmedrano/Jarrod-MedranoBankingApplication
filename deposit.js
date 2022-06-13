function Deposit() {
  return (
    <Card
      txtcolor="black"
      header="Deposit Money"
      text="Worry not. Your money is safe with Bad Bank!"
      body={<DepositForm />}
    />
  );
}
