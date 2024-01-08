import { Container, Logout } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow-sm bg-slate-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">LOGO</Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item}>
                  <button onClick={() => navigate(item.url)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          {authStatus && (
            <li>
              <Logout />
            </li>
          )}
        </nav>
      </Container>
    </header>
  );
}
