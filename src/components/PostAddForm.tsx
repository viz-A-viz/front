import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../store/actionCreators/postsActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { showAllPosts } from '../store/reducers/postsSlice';

export default function PostAddForm() {
  const { user } = useAppSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (user) {
      await dispatch(addPost({ title, text, userId: user.id }));
      dispatch(showAllPosts());
      navigate('/');
    }
  };

  return (
    <Container>
      <Form className="my-2">
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
