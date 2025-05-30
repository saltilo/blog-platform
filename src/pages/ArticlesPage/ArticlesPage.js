import { useEffect, useState } from "react";
import { fetchArticles } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useLocation } from "react-router-dom";
import "./ArticlesPage.css";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  const ARTICLES_PER_PAGE = 10;

  const [refreshKey, setRefreshKey] = useState(0);

  const location = useLocation();

  const handleLikeUpdate = (updatedArticle) => {
    setArticles((prev) =>
      prev.map((art) =>
        art.slug === updatedArticle.slug ? updatedArticle : art
      )
    );
  };

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [location.state]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticles(
          (page - 1) * ARTICLES_PER_PAGE,
          ARTICLES_PER_PAGE,
          token
        );
        setArticles(data.articles);
        setTotal(data.articlesCount);
      } catch (err) {
        setError("Не удалось загрузить статьи");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, refreshKey]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage text={error} />;

  return (
    <div className="articles-page">
      {articles.map((item) => (
        <ArticlePreview
          key={item.slug}
          article={item}
          onLikeToggle={handleLikeUpdate}
        />
      ))}
      <Pagination currentPage={page} total={total} onPageChange={setPage} />
    </div>
  );
};

export default ArticlesPage;
