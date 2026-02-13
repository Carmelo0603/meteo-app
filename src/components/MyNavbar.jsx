import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-dark mb-0">
      <Container>
        <Navbar.Brand className="text-white" href="">
          GoodTime
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
