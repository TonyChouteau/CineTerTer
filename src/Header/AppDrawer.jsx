const drawerStyles = makeStyles((theme) => ({
  root: {
    background: THEME.palette.primary.background,
    color: THEME.palette.primary.text,
  },
  item: {
    "&:hover": {
      background: THEME.palette.secondary.background,
    },
  },
  itemIcon: {
    color: THEME.palette.primary.text,
  },
  itemText: {
    width: "150px",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  whiteText: {
    color: THEME.palette.primary.text,
    "& label.Mui-focused": {
      color: THEME.palette.primary.main,
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
  rLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "inherit",
    },
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(1) + "px " + theme.spacing(3) + "px",
  },
}));

function AppDrawer(props) {
  const classes = drawerStyles();

  const menu = [
    {
      icon: "search",
      text: "search",
      url: "/",
    },
    {
      icon: "insert_chart",
      text: "stats",
      url: "/stats",
    },
  ];

  return (
    <Drawer
      open={props.open}
      onClose={props.closeDrawer}
      classes={{ paperAnchorLeft: classes.root }}
    >
      <List>
        {menu.map((item) => (
          <React.Fragment key={item.icon}>
            <RLink
              className={makeClass(
                classes.rLink,
                classes.item,
                classes.itemText
              )}
              to={item.url}
              onClick={props.closeDrawer}
            >
              <ListItemIcon className={classes.itemIcon}>
                <span className="material-icons">{item.icon}</span>
              </ListItemIcon>
              <ListItemText className={classes.itemText}>
                <Typography>{translateMenu(item.text, props.lang)}</Typography>
              </ListItemText>
            </RLink>
            <Divider></Divider>
          </React.Fragment>
        ))}
        <ListItem>
          <FormControl
            variant="outlined"
            className={makeClass(classes.formControl, classes.whiteText)}
          >
            <InputLabel
              shrink={true}
              id="input-language-label"
              className={makeClass(classes.whiteText)} //padding 10px
            >
              {translateMenu("lang", props.lang)}
            </InputLabel>
            <Select
              labelId="input-language-label"
              id="select-language"
              value={props.lang}
              onChange={props.onLanguageChange}
              className={makeClass(classes.selectEmpty, classes.whiteText)}
              label={"Language"}
              classes={{
                root: classes.selectRoot,
                icon: classes.icon,
              }}
            >
              {LANGUAGE_AVAILABLE.map((lang) => (
                <MenuItem value={lang} key={lang}>
                  <em>{getLanguage(lang).name}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Version></Version>
    </Drawer>
  );
}
