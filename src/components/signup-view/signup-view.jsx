import { useState } from "react";
import { InputGroup, Input, Form } from "react-bootstrap";



export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      UserName: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch("https://myflix22-92d05c2f180f.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed")
        }
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label> */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
      </Form.Group>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}