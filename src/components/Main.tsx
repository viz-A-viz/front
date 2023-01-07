import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Posts from './Posts';
import Sort from './Sort';
import { useAppSelector } from '../store/hooks';
import MyPagination from './MyPagination';

export default function Main() {
  const navigate = useNavigate();
  const { showPost, onlyMyPosts } = useAppSelector((state) => state.posts);

  return (
    <Container>
      <Stack gap={3} className="my-2 col-md-6 mx-auto">
        {!showPost && <Sort />}
        <Posts />
        {!showPost && (
          <Button onClick={() => navigate('/add')}>add post</Button>
        )}
        {!showPost && !onlyMyPosts && <MyPagination />}
      </Stack>
    </Container>
  );
}
