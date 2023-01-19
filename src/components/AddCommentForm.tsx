import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { addComment } from '../store/actionCreators/commentsActions';
import { useAppDispatch } from '../store/hooks';
import { CommentType } from '../types/Comment';

export interface CommentProps {
  comment?: CommentType;
  postId: number;
  index: number;
  setIsCommenting: Dispatch<SetStateAction<boolean>>;
}

export default function AddCommentForm(props: CommentProps) {
  const { comment, postId, index, setIsCommenting } = props;
  const [commentText, setCommentText] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      addComment({
        parentId: comment?.id,
        postId,
        text: commentText,
        width: comment?.width || 100,
        index,
      })
    );
    setIsCommenting(false);
  };

  return (
    <Card style={{ width: '90%', alignSelf: 'end' }}>
      <Card.Body>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Enter comment"
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button onClick={handleSubmit}>Confirm</Button>
      </Card.Body>
    </Card>
  );
}
