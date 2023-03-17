import { useState } from "react";
import { Link } from "react-router-dom";

function MainNavbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDropdownExpnanded, setIsDropdownExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand mb-2" href="#">
          ShoppApp
        </a>
        <button
          className={
            isNavExpanded ? "navbar-toggler show" : "navbar-toggler collapsed"
          }
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isNavExpanded}
          aria-label="Toggle navigation"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            isNavExpanded ? "show navbar-collapse" : "collapse navbar-collapse"
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 h5">
            <li className="nav-item ">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/items">
                Items
                // might need later
              </Link>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownExpnanded}
                onClick={() => {
                  setIsDropdownExpanded(!isDropdownExpnanded);
                }}
              >
                Lists
              </a>
              <ul
                className={
                  isDropdownExpnanded ? "dropdown-menu show" : "dropdown-menu"
                }
              >
                <li>
                  <Link className="dropdown-item" to="newlist">
                    New List
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    My Lists
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    Pending Lists
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Disabled</a>
            </li>
          </ul>
          <button className="btn btn-outline-success" type="submit">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MainNavbar;
