import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("avatar", user.image || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        username: data.username,
        email: data.email,
        image: data.avatar || null,
      };

      if (data.newPassword) {
        updatedData.password = data.newPassword;
      }

      await updateProfile(updatedData);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Ошибка обновления профиля:", err);
      alert("Ошибка при обновлении профиля");
    }
  };

  return (
    <div className="profile-wrapper">
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit Profile</h2>

        <label>
          Username
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </label>

        <label>
          Email address
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </label>

        <label>
          New password
          <input
            type="password"
            {...register("newPassword", {
              minLength: {
                value: 6,
                message: "Min 6 characters",
              },
              maxLength: {
                value: 40,
                message: "Max 40 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="error">{errors.newPassword.message}</p>
          )}
        </label>

        <label>
          Avatar image (url)
          <input
            type="url"
            {...register("avatar", {
              pattern: {
                value:
                  /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif|svg|bmp|ico))$/i,
                message: "Must be valid image URL",
              },
            })}
          />
          {errors.avatar && <p className="error">{errors.avatar.message}</p>}
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
