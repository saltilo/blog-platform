import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header"; // default export
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import { Layout } from "antd";

const { Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header />
      <Content style={{ padding: "24px 48px" }}>
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;
