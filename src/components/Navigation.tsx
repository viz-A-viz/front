import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
  return (
    <Navbar expand="lg" className="my-4">
      <Container>
        <Navbar.Brand href="/">Just a blog</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
