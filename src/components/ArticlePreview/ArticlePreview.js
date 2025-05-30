import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { likeArticle, unlikeArticle } from "../../services/articles";
import likeIcon from "../../assets/like.png";
import likedIcon from "../../assets/liked.png";
import "./ArticlePreview.css";

const ArticlePreview = ({ article, onLikeToggle }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleToggleLike = async () => {
    if (!token || loading) return;
    setLoading(true);
    try {
      const updated = article.favorited
        ? await unlikeArticle(article.slug, token)
        : await likeArticle(article.slug, token);
      onLikeToggle?.(updated);
    } catch (err) {
      console.error("Ошибка при лайке:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="preview-card">
      <div className="preview-header">
        <div className="left-block">
          <div className="title-row">
            <Link to={`/articles/${article.slug}`} className="preview-title">
              {article.title}
            </Link>
            <span
              className="likes"
              onClick={handleToggleLike}
              style={{ opacity: loading ? 0.5 : 1 }}>
              <img
                src={article.favorited ? likedIcon : likeIcon}
                alt="like"
                width={16}
                height={16}
              />
              {article.favoritesCount}
            </span>
          </div>

          <div className="preview-tags">
            {article.tagList?.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <p className="preview-description">{article.description}</p>
        </div>

        <div className="right-block">
          <div className="author-info">
            <div className="author-name">{article.author.username}</div>
            <div className="date">
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </div>
          <img
            className="avatar"
            src={
              article.author.image ||
              "https://avatars.githubusercontent.com/u/9919?v=4"
            }
            alt="author"
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
