const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
	color: "white"
  },
}));

function Menu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <span className="material-icons">menu</span>
          </IconButton>
          <List className={classes.list}>
            <ListItem>
              <RLink to="/" className={classes.link}>
                <Typography
                  variant="h6"
                  className={classes.title + " " + classes.active}
                >
                  Home
                </Typography>
              </RLink>
            </ListItem>
            <ListItem>
              <RLink to="Info" className={classes.link}>
                <Typography variant="h6" className={classes.title}>
                  Stats
                </Typography>
              </RLink>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
}
