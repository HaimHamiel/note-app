// import logo from "../../assets/logo.svg";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

function Header() {
  const path = window.location.pathname;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          {/* <img src={logo} style={{ height: 70, width: 200 }} alt="logo" /> */}
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            {" "}
            <li className={path === "/" ? "active" : ""}>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;