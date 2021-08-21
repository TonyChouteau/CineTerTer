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
}));

function AppDrawer(props) {
  const classes = drawerStyles();

  const menu = [
    {
      icon: "search",
      text: "Search",
      url: "/",
    },
    {
      icon: "insert_chart",
      text: "Stats",
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
          <ListItem
            button
            className={classes.item}
            onClick={props.closeDrawer}
            component="a"
            href={item.url}
            key={item.text}
          >
            <ListItemIcon className={classes.itemIcon}>
              <span className="material-icons">{item.icon}</span>
            </ListItemIcon>
            <ListItemText className={classes.itemText}>
              <Typography>{item.text}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
