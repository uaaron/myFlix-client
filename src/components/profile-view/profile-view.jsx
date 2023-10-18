import { useState } from "react"
import { Button, Link, Form, Row, Col, Modal } from "react-bootstrap"
import './profile-view.scss'
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, setUser, token, movies }) => {
  const [username, setUsername] = useState(user.UserName);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [showDeregisterModal, setDeregisterModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);


  const handleShowUpdateModal = () => setUpdateModal(true);
  const handleCloseUpdateModal = () => setUpdateModal(false);

  const handleShowDeregisterModal = () => setDeregisterModal(true);
  const handleCloseDeregisterModal = () => setDeregisterModal(false);

  let result = movies.filter(
    m => user.FavoriteMovies.includes(m._id)
  )

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      UserName: username,
      Email: email,
      Birthday: formatDate(birthday)
    };
    if (password) {
      data["Password"] = password;
    }

    fetch(`https://myflix22-92d05c2f180f.herokuapp.com/users/${user.UserName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        alert("failed");
        return false;
      }
    })
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };


  const handleDeleteUser = (event) => {
    event.preventDefault();

    fetch(`https://myflix22-92d05c2f180f.herokuapp.com/users/${user.UserName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        localStorage.clear();
        alert("Your account has been deleted");
      } else {
        alert("something went wrong.")
      }
    })
  }



  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const month = date.getMonth() + 1;  // Months are zero-indexed, so we add 1
    const day = date.getDate();
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
  }


  return (
    <>
      <Row>
        <Col md={5}>
          <h1>Profile Info</h1>
          <p><strong>Username:</strong> {user.UserName}</p>
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>Birthday:</strong> {formatDate(user.Birthday)}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShowUpdateModal}>Update user info</Button>
          <Button variant="link" className="text-danger" onClick={handleShowDeregisterModal}>Delete User</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Favorite Movies: </h1>
        </Col>
      </Row>
      <Row>
        {result.map((movie) => {
          return (
            <Col>
              <MovieCard
                movie={movie}
              />
            </Col>
          );
        })}

      </Row>


      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label><strong>Username: </strong> </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label><strong>Password: </strong> </Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*******"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label><strong>Email:</strong></Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label><strong>Birth Date: </strong></Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit Changes</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeregisterModal} onHide={handleCloseDeregisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteUser}>Yes</Button>
          <Button onClick={handleCloseDeregisterModal}>No</Button>
        </Modal.Footer>
      </Modal>

    </>

  )
}