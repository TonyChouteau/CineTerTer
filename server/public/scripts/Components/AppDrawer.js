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
  };
});

function AppDrawer(props) {
  var classes = drawerStyles();

  var menu = [
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
            React.createElement(
              Typography,
              null,
              translateMenu(item.text, props.lang)
            )
          )
        );
      }),
      React.createElement(
        ListItem,
        null,
        React.createElement(
          FormControl,
          {
            variant: "outlined",
            className: makeClass(classes.formControl, classes.whiteText),
          },
          React.createElement(
            InputLabel,
            {
              shrink: true,
              id: "input-language-label",
              className: makeClass(classes.whiteText), //padding 10px
            },
            translateMenu("lang", props.lang)
          ),
          React.createElement(
            Select,
            {
              labelId: "input-language-label",
              id: "select-language",
              value: props.lang,
              onChange: props.onLanguageChange,
              className: makeClass(classes.selectEmpty, classes.whiteText),
              label: "Language",
              classes: {
                root: classes.selectRoot,
                icon: classes.icon,
              },
            },
            LANGUAGE_AVAILABLE.map(function (lang) {
              return React.createElement(
                MenuItem,
                { value: lang, key: lang },
                React.createElement("em", null, getLanguage(lang).name)
              );
            })
          )
        )
      )
    )
  );
}
