import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/Home";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Store from "./pages/Store";
import AddUser from "./components/users/AddUser";
import EditUser from "./pages/EditUser";
import User from "./pages/User";
import SignUpForm from "./pages/SignUpForm";
import PrivateRoutes from "./pages/PrivateRoutes";
import AddUserData from "./components/users/AddUserData";

function App() {
  return (
    <div>
      <Container className="mb-4">
        <Routes>
          <Route
            exact
            path="/home"
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/store"
            element={
              <PrivateRoutes>
                <Store />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <PrivateRoutes>
                <About />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/users/add"
            element={
              <PrivateRoutes>
                {/* <AddUser /> */}
                <AddUserData />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/users/:id"
            element={
              <PrivateRoutes>
                <User />
              </PrivateRoutes>
            }
          />
          <Route
            exact
            path="/users/edit/:id"
            element={
              <PrivateRoutes>
                <EditUser />
              </PrivateRoutes>
            }
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<SignUpForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
