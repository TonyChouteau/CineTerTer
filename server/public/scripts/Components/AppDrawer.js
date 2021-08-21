var drawerStyles = makeStyles(function (theme) {
  return {
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
  };
});

function AppDrawer(props) {
  var classes = drawerStyles();

  var menu = [
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

  return React.createElement(
    Drawer,
    {
      open: props.open,
      onClose: props.closeDrawer,
      classes: { paperAnchorLeft: classes.root },
    },
    React.createElement(
      List,
      null,
      menu.map(function (item) {
        return React.createElement(
          ListItem,
          {
            button: true,
            className: classes.item,
            onClick: props.closeDrawer,
            component: "a",
            href: item.url,
            key: item.text,
          },
          React.createElement(
            ListItemIcon,
            { className: classes.itemIcon },
            React.createElement(
              "span",
              { className: "material-icons" },
              item.icon
            )
          ),
          React.createElement(
            ListItemText,
            { className: classes.itemText },
            React.createElement(Typography, null, item.text)
          )
        );
      })
    )
  );
}
