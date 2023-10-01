export const LoginView = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password
    };

    fetch("/login", {
      method: "POST",
      body: JSON.stringify(data)
    });
  };



  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};