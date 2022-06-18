const useLocation = ReactRouterDOM.useLocation;

const NavBar = (props) => {
  const location = useLocation();
  const fooRef = React.useRef(null);

  const routes = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Create Account",
      href: "/CreateAccount/",
    },
    {
      name: "Login",
      href: "/login/",
    },
    {
      name: "Deposit",
      href: "/deposit/",
    },
    {
      name: "Withdraw",
      href: "/withdraw/",
    },
    {
      name: "Balance",
      href: "/balance/",
    },
    {
      name: "All Data",
      href: "/alldata",
    },
  ];

  useEffect(() => {}, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <ReactTooltip text="Tooltip text">
          <button className="btn btn-primary" type="button">
            My button
          </button>
        </ReactTooltip> */}

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {routes.map((route) => {
              return (
                <li key={route.name} className="nav-item">
                  <a
                    className={
                      location.pathname.includes(route.href)
                        ? "nav-link active"
                        : "nav-link"
                    }
                    href={"#" + route.href}
                  >
                    {route.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
