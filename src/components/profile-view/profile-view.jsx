import { useState } from "react"
import { Button, Link, Form, Row, Col, Modal } from "react-bootstrap"
import './profile-view.scss'

export const ProfileView = ({ user }) => {
  const [username, setUsername] = useState(user.UserName);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [showDeregisterModal, setDeregisterModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      UserName: username,
      Email: email,
      Birthday: birthday
    };
    if (password) {
      data["Password"] = password;
    }

    fetch("")

  }

  const handleShowUpdateModal = () => setUpdateModal(true);
  const handleCloseUpdateModal = () => setUpdateModal(false);

  const handleShowDeregisterModal = () => setDeregisterModal(true);
  const handleCloseDeregisterModal = () => setDeregisterModal(false);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const month = date.getMonth() + 1;  // Months are zero-indexed, so we add 1
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
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


      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          <Button>Yes</Button>
          <Button onClick={handleCloseDeregisterModal}>No</Button>
        </Modal.Footer>
      </Modal>

    </>

  )
}