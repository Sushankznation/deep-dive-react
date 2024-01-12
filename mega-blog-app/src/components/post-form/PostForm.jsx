import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../UI";
import RTE from "../RTE/RTE";
import appwriteService from "../../AppWrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  //for urlTransform
  const slugTransform = useCallback((value) => {
    if (value) {
      return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return "";
    }
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    /*unsubscribe is being used to
    avoid : memory leakage, infinite loop,
    or can an easy way to tell that Im done you can do your job now , dont give me any update */
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return <div></div>;
}
