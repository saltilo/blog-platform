import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { App as AntdApp } from "antd";
import ReactMarkdown from "react-markdown";

import { useAuth } from "../../context/AuthContext";
import {
  getArticle,
  likeArticle,
  unlikeArticle,
  deleteArticle,
} from "../../services/articles";

import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import likeIcon from "../../assets/like.png";
import likedIcon from "../../assets/liked.png";

import "./ArticlePage.css";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { modal } = AntdApp.useApp();
  const { user, token } = useAuth();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getArticle(slug, token);
        setArticle(data.article);
      } catch (err) {
        setError("Не удалось загрузить статью");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const handleToggleLike = async () => {
    if (!token || likeLoading) return;
    setLikeLoading(true);

    try {
      const updated = article.favorited
        ? await unlikeArticle(slug, token)
        : await likeArticle(slug, token);
      setArticle(updated);
    } catch (err) {
      console.error("Ошибка при лайке:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage text={error} />;
  if (!article) return null;

  const {
    title,
    body,
    description,
    author,
    createdAt,
    favoritesCount,
    favorited,
    tagList,
  } = article;

  return (
    <div className="article-page-wrapper">
      <div className="article-page">
        <div className="article-top">
          <div className="top-left">
            <div className="title-like">
              <h1 className="article-title">{title}</h1>
              <span className="like-wrapper" onClick={handleToggleLike}>
                <img
                  src={favorited ? likedIcon : likeIcon}
                  alt="like"
                  width={16}
                  height={16}
                  style={{ cursor: "pointer" }}
                />
                <span className="like-count">{favoritesCount}</span>
              </span>
            </div>

            <div className="tags">
              {tagList?.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="preview-description">{description}</p>
          </div>

          <div className="top-right">
            <div className="author-text">
              <div className="author-name">{author.username}</div>
              <div className="date">
                {new Date(createdAt).toLocaleDateString()}
              </div>
            </div>
            <img
              className="avatar"
              src={
                author.image ||
                "https://avatars.githubusercontent.com/u/9919?v=4"
              }
              alt="author"
            />
          </div>
        </div>

        {user && user.username === author.username && (
          <div className="article-actions">
            <button
              className="delete-btn"
              onClick={() =>
                modal.confirm({
                  content: "Are you sure to delete this article?",
                  okText: "Yes",
                  cancelText: "No",
                  onOk: async () => {
                    await deleteArticle(slug, token);
                    navigate("/", { state: { refresh: true } });
                  },
                })
              }>
              Delete
            </button>

            <button
              className="edit-btn"
              onClick={() => navigate(`/articles/${slug}/edit`)}>
              Edit
            </button>
          </div>
        )}

        <div className="article-body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
