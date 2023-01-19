import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import {
  deletePost,
  fetchPosts,
  likePost,
  unlikePost,
} from '../store/actionCreators/postsActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { showOnePost, sortPosts } from '../store/reducers/postsSlice';

import { PostType } from '../types/Post';
import Comments from './Comments';

export interface PostProps {
  post: PostType;
}

export default function Post(props: PostProps) {
  const { post } = props;
  const { user } = useAppSelector((state) => state.user);
  const { showPost } = useAppSelector((state) => state.posts);

  const [likes, setLikes] = useState(post._count.Likes);
  const [likedByUser, setLiked] = useState(false);
  const [myPost, setMyPost] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setLiked(_.some(post.Likes, { userId: user.id }));
    if (user) setMyPost(user.id === post.userId);
  }, []);

  const handleDelete = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleLike = () => {
    if (user) {
      dispatch(likePost({ postId: post.id, userId: user.id }))
        .then(() => dispatch(fetchPosts()))
        .then(() => dispatch(sortPosts()));
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleUnlike = () => {
    if (user) {
      dispatch(unlikePost({ postId: post.id, userId: user.id }))
        .then(() => dispatch(fetchPosts()))
        .then(() => dispatch(sortPosts()));
      setLiked(false);
      setLikes(likes - 1);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title
            className="text-center"
            onClick={() => dispatch(showOnePost(post.id))}
          >
            {post.title}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-center">
            {`by ${post.Users.firstName} ${post.Users.lastName}, ${new Date(
              post.createdAt
            ).toDateString()}`}
          </Card.Subtitle>
          <Card.Text className={showPost ? 'fullCardText' : 'cardText'}>
            {post.text}
          </Card.Text>
          <Row>
            <Col>
              {myPost && (
                <>
                  <Card.Link
                    onClick={() => navigate('/edit', { state: { ...post } })}
                    className="text-secondary"
                  >
                    Edit
                  </Card.Link>
                  <Card.Link
                    onClick={() => handleDelete(post.id)}
                    className="text-secondary"
                  >
                    Delete
                  </Card.Link>
                </>
              )}
            </Col>
            <Col className="text-center">
              {showPost === 0 && (
                <Card.Link
                  onClick={() => dispatch(showOnePost(post.id))}
                  className="text-secondary"
                >
                  Show full text
                </Card.Link>
              )}
            </Col>
            <Col className="text-end">
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
      {showPost ? <Comments post={post} /> : null}
    </>
  );
}
