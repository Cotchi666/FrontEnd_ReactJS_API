import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Nav, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header >
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand> ICON</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route
                path="/classes/Room/:objectId"
                element={<ProductScreen />}
              />
              {/* <Route exact path="/Cart" component={CartListScreen} /> */}
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">
          All rights  reserved
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
