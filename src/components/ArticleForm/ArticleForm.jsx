import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./ArticleForm.css";

const ArticleForm = ({ onSubmit, initialValues = {}, buttonText = "Save" }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  useEffect(() => {
    reset({
      title: initialValues.title || "",
      description: initialValues.description || "",
      body: initialValues.body || "",
      tagList:
        Array.isArray(initialValues.tagList) && initialValues.tagList.length
          ? initialValues.tagList
          : [""],
    });
  }, [initialValues, reset]);

  return (
    <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>{initialValues?.title ? "Edit article" : "Create new article"}</h2>

      <label>
        Title
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </label>

      <label>
        Short description
        <input
          {...register("description", {
            required: "Description is required",
          })}
          placeholder="Short description"
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
      </label>

      <label>
        Text
        <textarea
          {...register("body", { required: "Text is required" })}
          placeholder="Text"
        />
        {errors.body && <p className="error">{errors.body.message}</p>}
      </label>

      <label>Tags</label>

      <div className="tags-wrapper">
        {fields.map((field, index) => (
          <div key={field.id} className="tag-item">
            <input {...register(`tagList.${index}`)} placeholder="Tag" />
            <div className="tag-buttons">
              <button
                type="button"
                className="delete-btn"
                onClick={() => remove(index)}>
                Delete
              </button>
              {index === fields.length - 1 && (
                <button
                  type="button"
                  className="add-tag-btn"
                  onClick={() => append("")}>
                  Add tag
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="submit-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default ArticleForm;
