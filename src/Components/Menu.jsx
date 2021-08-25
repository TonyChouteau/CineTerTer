const menuStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    minHeight: THEME.size.appBar,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appBarSide: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  active: {
    color: "#BBB",
  },
  list: {
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#ffffff22",
    "&:hover": {
      backgroundColor: "#ffffff33",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    display: "flex",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Menu(props) {
  const classes = menuStyles();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [account, setAccount] = React.useState("");

  function onKeyPress(event) {
    props.onSearch(event);
  }

  function onLanguageChange(event) {
    props.onLanguageChange(event.target.value);
  }

  if (account === "") {
    fetch()
  }

  return (
    <div className={classes.root}>
      <AppDrawer
        open={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        lang={props.lang}
        onLanguageChange={onLanguageChange}
      ></AppDrawer>
      <AppBar position="static" color="primary">
        <Toolbar className={classes.appBar}>
          <div className={classes.appBarSide}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setOpenDrawer(true)}
            >
              <span className="material-icons">menu</span>
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <span className="material-icons">search</span>
              </div>
              <InputBase
                placeholder={translateMenu("search", props.lang) + "..."}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={onKeyPress}
                onKeyPress={onKeyPress}
                value={props.query}
              />
            </div>
          </div>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Avatar alt="Avatar" src={getLocalImage(AVATAR_URL)} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
