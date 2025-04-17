import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import { Layout } from "antd";

const { Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header />
      <Content style={{ padding: "24px 48px" }}>
        <Switch>
          <Route exact path={["/", "/articles"]} component={ArticlesPage} />
          <Route path="/articles/:slug" component={ArticlePage} />
          <Route render={() => <div>404 Not Found</div>} />
        </Switch>
      </Content>
    </Layout>
  </Router>
);

export default App;
