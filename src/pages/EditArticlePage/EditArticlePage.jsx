import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getArticle, updateArticle } from "../../services/articles";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import Spinner from "../../components/Spinner/Spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const EditArticlePage = () => {
  const { slug } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getArticle(slug);

        if (data.article.author.username !== user.username) {
          setError("You are not the author of this article.");
          return;
        }
        setArticle(data.article);
      } catch (err) {
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug, user.username]);

  const handleSubmit = async (data) => {
    try {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.filter((t) => t.trim() !== ""),
      };

      const res = await updateArticle(slug, articleData, token);
      navigate(`/articles/${res.article.slug}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update article.");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage text={error} />;

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      initialValues={article}
      buttonText="Save"
    />
  );
};

export default EditArticlePage;
