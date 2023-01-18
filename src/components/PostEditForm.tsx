import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { editPost } from '../store/actionCreators/postsActions';
import { useAppDispatch } from '../store/hooks';
import { showAllPosts } from '../store/reducers/postsSlice';
import { PostType } from '../types/Post';

export default function PostEditForm() {
  const location = useLocation();
  const [idEdit, setId] = useState(0);
  const [titleEdit, setTitle] = useState('');
  const [textEdit, setText] = useState('');

  useEffect(() => {
    if (!location.state) navigate('/');
    else {
      const { id, title, text } = location.state as PostType;
      setTitle(title);
      setText(text);
      setId(id);
    }
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    await dispatch(editPost({ idEdit, titleEdit, textEdit }));
    dispatch(showAllPosts());
    navigate('/');
  };

  return (
    <Container>
      <Form className="my-2">
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={titleEdit}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formText">
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={textEdit}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </Container>
  );
}
