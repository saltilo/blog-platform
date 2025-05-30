import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import { Layout } from "antd";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";
import EditArticlePage from "./pages/EditArticlePage/EditArticlePage";

const { Content } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header />
      <Content style={{ padding: "24px 48px" }}>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<ArticlesPage />} />

          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute>
                <EditArticlePage />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <NewArticlePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Content>
    </Layout>
  </Router>
);

export default App;
