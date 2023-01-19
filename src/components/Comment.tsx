import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import {
  deleteComment,
  fetchComments,
  likeComment,
  unlikeComment,
} from '../store/actionCreators/commentsActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CommentType } from '../types/Comment';
import AddCommentForm from './AddCommentForm';

export interface CommentProps {
  comment: CommentType;
  index: number;
}

export default function Comment(props: CommentProps) {
  const { comment, index } = props;
  const { user } = useAppSelector((state) => state.user);

  const [myComment, setMyComment] = useState(false);
  const [likes, setLikes] = useState(comment._count.Likes);
  const [likedByUser, setLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) setMyComment(user.id === comment.userId);
  }, []);

  const handleLike = () => {
    if (user) {
      dispatch(likeComment({ commentId: comment.id, userId: user.id })).then(
        () => dispatch(fetchComments(comment.postId))
      );
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleUnlike = () => {
    if (user) {
      dispatch(unlikeComment({ commentId: comment.id, userId: user.id })).then(
        () => dispatch(fetchComments(comment.postId))
      );
      setLiked(false);
      setLikes(likes - 1);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteComment(id));
    dispatch(fetchComments(comment.postId));
  };

  return (
    <>
      <Card style={{ width: `${comment.width}%`, alignSelf: 'end' }}>
        <Card.Body>
          <Card.Title className="text-center">{`${comment.user.firstName} ${comment.user.lastName}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            {new Date(comment.createdAt).toDateString()}
          </Card.Subtitle>
          <Card.Text className="text-center">{comment.text}</Card.Text>
          <Row>
            <Col>
              {myComment && (
                <Card.Link
                  onClick={() => handleDelete(comment.id)}
                  className="text-secondary"
                >
                  Delete
                </Card.Link>
              )}
            </Col>
            <Col className="text-end">
              <Card.Link onClick={() => setIsCommenting(!isCommenting)}>
                <i className="bi bi-arrow-return-right me-2" />
              </Card.Link>
              {likedByUser ? (
                <Card.Link onClick={handleUnlike}>
                  <i className="bi bi-heart-fill me-2 text-danger" />
                </Card.Link>
              ) : (
                <Card.Link onClick={handleLike}>
                  <i className="bi bi-heart me-2 text-danger" />
                </Card.Link>
              )}
              {likes}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {isCommenting && (
        <AddCommentForm
          comment={comment}
          postId={comment.postId}
          index={index}
          setIsCommenting={setIsCommenting}
        />
      )}
    </>
  );
}
