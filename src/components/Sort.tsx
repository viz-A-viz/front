import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../store/hooks';
import { setSortType, toggleOnlyMyPosts } from '../store/reducers/postsSlice';

export default function Sort() {
  const dispatch = useAppDispatch();
  return (
    <>
      <Form.Check
        type="switch"
        id="custom-switch"
        reverse
        label="Only my posts"
        className="align-self-end"
        onChange={() => dispatch(toggleOnlyMyPosts())}
      />
      <Form.Select
        aria-label="Default select example"
        onChange={(e) => dispatch(setSortType(e.target.value))}
      >
        <option value="popularity">Sorted by popularity</option>
        <option value="date">Sorted by date</option>
        <option value="likes">Sorted by likes</option>
      </Form.Select>
    </>
  );
}
