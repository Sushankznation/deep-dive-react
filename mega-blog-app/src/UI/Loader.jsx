import { Comment } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
    <Comment
      visible={true}
      height="100"
      width="100"
      ariaLabel="comment-loading"
      wrapperStyle={{}}
      wrapperClass="comment-wrapper"
      color="#fff"
      backgroundColor="#3BBADB"
    />
    </div>
  );
}
