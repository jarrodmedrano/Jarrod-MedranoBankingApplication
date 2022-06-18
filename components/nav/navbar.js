const useLocation = ReactRouterDOM.useLocation;

const NavBar = () => {
  const location = useLocation();
  const [showToolTip, setShowToolTip] = React.useState(false);
  const [toolTipTarget, setToolTipTarget] = React.useState(null);
  const [toolTipContent, setToolTipContent] = React.useState(null);
  const fooRef = React.useRef(null);

  const routes = [
    {
      name: "Home",
      href: "/",
      desc: "Go Home",
    },
    {
      name: "Create Account",
      href: "/CreateAccount/",
      desc: "Make a new account if you haven't already",
    },
    {
      name: "Login",
      href: "/login/",
      desc: "Log in if you remember your password",
    },
    {
      name: "Deposit",
      href: "/deposit/",
      desc: "Gimme your money",
    },
    {
      name: "Withdraw",
      href: "/withdraw/",
      desc: "Take your money out",
    },
    {
      name: "Balance",
      href: "/balance/",
      desc: "See your balance",
    },
    {
      name: "All Data",
      href: "/alldata",
      desc: "See all the data",
    },
  ];

  const handleToolTipTarget = () => {
    if (fooRef && fooRef.current) {
      return fooRef.current.getBoundingClientRect();
    }
  };

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

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          style={{ position: "relative" }}
        >
          <ul className="navbar-nav">
            {routes.map((route) => {
              return (
                <li key={route.name} className="nav-item" ref={fooRef}>
                  <a
                    className={
                      location.pathname.includes(route.href)
                        ? "nav-link active"
                        : "nav-link"
                    }
                    href={"#" + route.href}
                    onMouseOver={(event) => {
                      event.stopPropagation();
                      setShowToolTip(!showToolTip);
                      setToolTipTarget(handleToolTipTarget);
                      setToolTipContent(route.desc);
                    }}
                    onMouseOut={(event) => {
                      event.stopPropagation();
                      setShowToolTip(false);
                    }}
                  >
                    {route.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <ToolTip
            showToolTip={showToolTip}
            toolTipContent={toolTipContent}
            toolTipTarget={toolTipTarget}
          />
        </div>
      </nav>
    </>
  );
};
