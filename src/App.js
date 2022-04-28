import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

import Pages from "./pages/Pages";
import Category from "./components/Category";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <Logo to={"/"}>
            <GiKnifeFork />
            <h4>CookUp</h4>
          </Logo>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
};

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  color: #313131;
  display: flex;
  align-items: center;
  h4 {
    font-size: 1.3rem;
  }
`;

const Nav = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  svg {
    font-size: 2.5rem;
  }
`;

export default App;
