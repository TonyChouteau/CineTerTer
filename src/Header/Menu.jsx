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
  rLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "inherit",
    },
  },
  item: {
    "&:hover": {
      background: THEME.palette.secondary.background,
    },
  },
  popover: {
    "& .MuiPopover-paper": {
      marginTop: "40px",
      background: THEME.palette.primary.background,
      color: THEME.palette.primary.text,
    },
  },
  whiteText: {
    color: THEME.palette.primary.text,
  },
  icon: {
    minWidth: "40px",
  },
}));

function Menu(props) {
  const classes = menuStyles();
  const user = props.user;

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onKeyPress(event) {
    props.onSearch(event);
  }

  function onLanguageChange(event) {
    props.onLanguageChange(event.target.value);
  }

  if (user === "" && props.logInfo.logged) {
    props.getUser();
  }

  function onSignout() {
    fetch(getLoginUrl(), {
      method: "DELETE",
    }).then(() => {
      const logInfo = {
        username: "-",
        password: "",
        error: false,
        logged: false,
        logging: false,
      };
      props.setLogInfo(logInfo);
    });
  }

  const menu = [
    {
      name: "user",
      icon: "account_circle",
      url: getUserPage(),
    },
    {
      name: "signout",
      icon: "logout",
      onClick: onSignout,
    },
  ];

  return (
    <div className={classes.root}>
      <AppDrawer
        open={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        lang={props.lang}
        onLanguageChange={onLanguageChange}
      ></AppDrawer>
      <AppBar position="static" color="primary" id="appbar">
        {props.logInfo.logged ? (
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
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <div>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  display={props.logInfo.logged ? "block" : "none"}
                  onClick={handleClick}
                  title="Account Page"
                >
                  <Avatar
                    alt={user ? user.name : ""}
                    src={getLocalImage(AVATAR_URL, true)}
                  />
                </IconButton>
                <Popover
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  className={classes.popover}
                >
                  <List>
                    {menu.map((item) => (
                      <RLink
                        key={item.name}
                        className={makeClass(classes.rLink, classes.whiteText)}
                        onClick={() => {
                          handleClose();
                          if (item.onClick) {
                            item.onClick();
                          }
                        }}
                        to={item.url}
                      >
                        <ListItem className={classes.item}>
                          <ListItemIcon
                            className={makeClass(
                              classes.whiteText,
                              classes.icon
                            )}
                          >
                            <span className="material-icons">{item.icon}</span>
                          </ListItemIcon>
                          <ListItemText className={classes.itemText}>
                            <Typography>
                              {translateLogin(item.name, props.lang)}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      </RLink>
                    ))}
                  </List>
                </Popover>
              </div>
            </div>
          </Toolbar>
        ) : (
          ""
        )}
      </AppBar>
    </div>
  );
}
