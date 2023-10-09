import { useState } from "react";
import { InputGroup, Input, Form, Button } from "react-bootstrap";



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
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          style={{ border: '2px solid #000' }}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required />
      </Form.Group>
      <Form.Group controlId="forPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          style={{ border: '2px solid #000' }}
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="forEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          style={{ border: '2px solid #000' }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="forBirthday">
        <Form.Label>Birth Date:</Form.Label>
        <Form.Control
          style={{ border: '2px solid #000' }}
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="btn btn-primary" type="submit">Submit</Button>
    </Form>
  )
}