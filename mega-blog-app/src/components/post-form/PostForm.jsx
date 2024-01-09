import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../UI";
import RTE from "../RTE/RTE";
import appwriteService from "../../AppWrite/configure";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  return <div></div>;
}