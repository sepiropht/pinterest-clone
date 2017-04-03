import Header from "../components/Header";
import withRedux from "next-redux-wrapper";
import Home from "../components/Home";

import { initStore } from "../store";
const App = () => (
  <div>
    <Header>
      <Home />
    </Header>

  </div>
);
export default withRedux(initStore)(App);
