/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPage } from '../store/reducers/postsSlice';

export default function MyPagination() {
  const { page, posts, onlyMyPosts, showPost } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();
  const [pages, setPages] = useState([] as JSX.Element[]);

  useEffect(() => {
    const items = [];
    for (let number = 1; number <= Math.ceil(posts.length / 10); number += 1) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => dispatch(setPage(number))}
        >
          {number}
        </Pagination.Item>
      );
    }
    setPages(items);
  }, [posts, onlyMyPosts, showPost, page]);

  return <Pagination>{pages}</Pagination>;
}
