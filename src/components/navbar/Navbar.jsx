import { Link } from "react-router-dom";
import keycloak from "../../keycloak";

function Navbar() {

  return (
    <nav>
      <div className="container">
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Start</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {keycloak.authenticated && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
          </ul>

          {keycloak.authenticated && (
            <ul>
              <li>
                <button onClick={() => keycloak.logout()}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
