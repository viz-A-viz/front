import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Main from './components/Main';
import Navigation from './components/Navigation';
import PostAddForm from './components/PostAddForm';
import PostEditForm from './components/PostEditForm';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getUser } from './store/actionCreators/usersActions';

function App() {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <BrowserRouter>
      {user && <Navigation />}
      <Routes>
        <Route path="/" element={user ? <Main /> : <LoginPage />} />
        <Route path="/add" element={user ? <PostAddForm /> : <LoginPage />} />
        <Route path="/edit" element={user ? <PostEditForm /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
