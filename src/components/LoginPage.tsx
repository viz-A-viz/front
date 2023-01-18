import { AxiosError } from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getUser,
  logIn,
  registerUser,
} from '../store/actionCreators/usersActions';
import Spinner from './Spinner/Spinner';
import { AxiosResponseData } from '../types/AxiosResponseData';

export default function LoginPage() {
  const [registering, setRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, userIsLoading } = useAppSelector((state) => state.user);
  if (user) navigate('/');

  const handleSubmitLogIn = async () => {
    const userLogIn = { email, password };
    const x = await dispatch(logIn(userLogIn));

    if (x.payload instanceof AxiosError && x.payload.response) {
      const data = x.payload.response.data as AxiosResponseData;
      const mess = data.message;
      setMessage(mess);
    }
    dispatch(getUser());
  };

  const handleSubmitRegister = async () => {
    const userRegister = { username, password, email, firstName, lastName };
    const newUser = await dispatch(registerUser(userRegister));

    if (newUser.payload instanceof AxiosError && newUser.payload.response) {
      const data = newUser.payload.response.data as AxiosResponseData;
      const mess = data.message;
      setMessage(mess);
    }
    dispatch(getUser());
  };

  if (userIsLoading) return <Spinner speed={1} customText="Loading..." />;
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {registering && (
          <>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-danger">{message}</Form.Text>
        </Form.Group>
        {registering ? (
          <Button variant="primary" onClick={() => handleSubmitRegister()}>
            Register
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handleSubmitLogIn()}>
            Log in
          </Button>
        )}
      </Form>
      {!registering && (
        <div className="text-center">
          <p>Not a member?</p>
          <a href="#" onClick={() => setRegistering(true)}>
            Register
          </a>
        </div>
      )}
    </Container>
  );
}
