import appWriteService from "../AppWrite/configure";
import { Link } from "react-router-dom";
export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/>${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">

            <img src="" alt=""/>
        </div>
      </div>
    </Link>
  );
}
