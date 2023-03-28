import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const logOut = () => {
    localStorage.removeItem("user");
  };
  return (
    <div className="container">
      <NavbarBs sticky="top" className=" Container bg-white shadow-sm mb-3">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/home" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/store" as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink}>
              About
            </Nav.Link>
            <Nav.Link to="/contact" as={NavLink}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav.Link to="/users/add" as={NavLink}>
            <button
              className="btn btn-success btn-sm float-left"
              style={{ marginRight: "20px" }}
            >
              Add User
            </button>
          </Nav.Link>
          <Nav.Link to="/" as={NavLink}>
            <button
              type="button"
              className="btn btn-danger btn-sm float-left"
              onClick={logOut}
            >
              Logout
            </button>
          </Nav.Link>
        </Container>
      </NavbarBs>
    </div>
  );
}
