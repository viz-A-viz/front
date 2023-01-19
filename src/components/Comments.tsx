/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { fetchComments } from '../store/actionCreators/commentsActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { PostType } from '../types/Post';
import AddCommentForm from './AddCommentForm';
import Comment from './Comment';

export interface CommentsProps {
  post: PostType;
}

export default function Comments(props: CommentsProps) {
  const { post } = props;

  const [isCommenting, setIsCommenting] = useState(false);

  const { comments } = useAppSelector((state) => state.comments);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, []);

  return (
    <>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <div style={{ marginRight: 'auto', visibility: 'hidden' }} />
        <div>Comments:</div>
        <div style={{ marginLeft: 'auto' }}>
          <i
            className="bi bi-plus-circle"
            onClick={() => setIsCommenting(!isCommenting)}
          />
        </div>
      </div>
      {isCommenting && (
        <AddCommentForm
          postId={post.id}
          index={-1}
          setIsCommenting={setIsCommenting}
        />
      )}
      {comments.map((comment, index) => (
        <Comment key={comment.id} comment={comment} index={index} />
      ))}
    </>
  );
}
