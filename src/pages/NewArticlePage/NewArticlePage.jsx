import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ArticleForm from "../../components/ArticleForm/ArticleForm";
import { createArticle } from "../../services/articles";

const NewArticlePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      title: "",
      description: "",
      body: "",
      tagList: [""],
    }),
    []
  );

  const handleSubmit = async (data) => {
    try {
      const articleData = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.filter((tag) => tag.trim() !== ""),
      };

      const response = await createArticle(articleData, token);
      const slug = response.article.slug;

      navigate(`/articles/${slug}`);
    } catch (err) {
      console.error("Ошибка при создании статьи:", err);
      alert("Не удалось создать статью");
    }
  };

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      buttonText="Send"
      initialValues={initialValues}
    />
  );
};

export default NewArticlePage;
