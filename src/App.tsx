import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Main from './components/Main';
import Navigation from './components/Navigation';
import PostAddForm from './components/PostAddForm';
import PostEditForm from './components/PostEditForm';
import { getUser } from './store/actionCreators/usersActions';
import { useAppDispatch, useAppSelector } from './store/hooks';

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
        <Route key={1} path="/" element={user ? <Main /> : <LoginPage />} />
        <Route
          key={2}
          path="/add"
          element={user ? <PostAddForm /> : <LoginPage />}
        />
        <Route
          key={3}
          path="/edit"
          element={user ? <PostEditForm /> : <LoginPage />}
        />
        <Route key={4} path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
