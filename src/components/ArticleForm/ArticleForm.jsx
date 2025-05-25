import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./ArticleForm.css";

const ArticleForm = ({ onSubmit, initialValues = {}, buttonText = "Send" }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: [""],
      ...initialValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (initialValues.tagList) {
      setValue("tagList", initialValues.tagList);
    }
  }, [initialValues, setValue]);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      append(tagInput.trim());
      setTagInput("");
    }
  };

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
        {fields.map((tag, index) => (
          <div key={tag.id} className="tag-item">
            <input
              {...register(`tagList.${index}`)}
              defaultValue={tag}
              placeholder="Tag"
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </div>
        ))}
        <div className="tag-add">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Tag"
          />
          <button type="button" onClick={handleAddTag}>
            Add tag
          </button>
        </div>
      </div>

      <button className="submit-button" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default ArticleForm;
