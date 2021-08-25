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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  whiteText: {
    color: THEME.palette.primary.text,
    "& label.Mui-focused": {
      color: THEME.palette.primary.text,
    },
  },
  selectEmpty: {
    "&:before": {
      borderColor: THEME.palette.primary.text,
    },
    "&:after": {
      borderColor: THEME.palette.primary.text,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: THEME.palette.primary.text,
    },
  },
  selectRoot: {
    padding: "10px",
    color: "white",
    borderColor: "white",
  },
  icon: {
    fill: THEME.palette.primary.text,
  },
}));

function Menu(props) {
  const classes = menuStyles();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  function onKeyPress(event) {
    props.onSearch(event);
  }

  function onLanguageChange(event) {
    props.onLanguageChange(event.target.value);
  }

  return (
    <div className={classes.root}>
      <AppDrawer
        open={openDrawer}
        closeDrawer={() => setOpenDrawer(false)}
        lang={props.lang}
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
            <FormControl
              variant="outlined"
              className={makeClass(classes.formControl, classes.whiteText)}
            >
              <InputLabel
                shrink={true}
                id="input-language-label"
                className={makeClass(classes.whiteText, { padding: "10px" })}
              >
                {translateMenu("lang", props.lang)}
              </InputLabel>
              <Select
                labelId="input-language-label"
                id="select-language"
                value={props.lang}
                onChange={onLanguageChange}
                className={makeClass(classes.selectEmpty, classes.whiteText)}
                label={"Language"}
                classes={{
                  root: classes.selectRoot,
                }}
              >
                {LANGUAGE_AVAILABLE.map((lang) => (
                  <MenuItem value={lang} key={lang}>
                    <em>{getLanguage(lang).name}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
