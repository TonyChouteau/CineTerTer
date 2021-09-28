var drawerStyles = makeStyles(function (theme) {
    return {
        root: {
            background: THEME.palette.primary.background,
            color: THEME.palette.primary.text
        },
        item: {
            "&:hover": {
                background: THEME.palette.secondary.background
            }
        },
        itemIcon: {
            color: THEME.palette.primary.text
        },
        itemText: {
            width: "200px"
        },
        formControl: {
            margin: theme.spacing(1),
            width: "100%"
        },
        whiteText: {
            color: THEME.palette.primary.text,
            "& label.Mui-focused": {
                color: THEME.palette.primary.main
            }
        },
        selectEmpty: {
            "&:before": {
                borderColor: THEME.palette.primary.text
            },
            "&:after": {
                borderColor: THEME.palette.primary.text
            },
            "&:hover:not(.Mui-disabled):before": {
                borderColor: THEME.palette.primary.text
            }
        },
        selectRoot: {
            padding: "10px",
            color: "white",
            borderColor: "white"
        },
        icon: {
            fill: THEME.palette.primary.text
        },
        rLink: {
            textDecoration: "none",
            color: "inherit",
            "&:hover": {
                color: "inherit"
            },
            display: "flex",
            flexDirection: "row",
            padding: theme.spacing(1) + "px " + theme.spacing(3) + "px"
        },
        divider: {
            height: "2px",
            backgroundColor: "rgba(255, 255, 255, 0.35)"
        }
    };
});

function AppDrawer(props) {
    var classes = drawerStyles();

    var menu = [{
        icon: "search",
        text: "search",
        url: "/",
        divider: false
    }, {
        icon: "insert_chart",
        text: "stats",
        url: "/stats",
        divider: true
    }, {
        icon: "people",
        text: "users",
        url: "/users",
        divider: true
    }, {
        icon: "update",
        text: "changelog",
        url: "/changelog",
        divider: false
    }];

    return React.createElement(
        Drawer,
        {
            open: props.open,
            onClose: props.closeDrawer,
            classes: { paperAnchorLeft: classes.root }
        },
        React.createElement(
            List,
            null,
            menu.map(function (item) {
                return React.createElement(
                    React.Fragment,
                    { key: item.icon },
                    React.createElement(
                        RLink,
                        {
                            className: makeClass(classes.rLink, classes.item, classes.itemText),
                            to: item.url,
                            onClick: props.closeDrawer
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
                    ),
                    item.divider ? React.createElement(Divider, { className: classes.divider }) : ""
                );
            }),
            React.createElement(
                ListItem,
                null,
                React.createElement(
                    FormControl,
                    {
                        variant: "outlined",
                        className: makeClass(classes.formControl, classes.whiteText)
                    },
                    React.createElement(
                        InputLabel,
                        {
                            shrink: true,
                            id: "input-language-label",
                            className: makeClass(classes.whiteText) //padding 10px
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
                                icon: classes.icon
                            }
                        },
                        LANGUAGE_AVAILABLE.map(function (lang) {
                            return React.createElement(
                                MenuItem,
                                { value: lang, key: lang },
                                React.createElement(
                                    "em",
                                    null,
                                    getLanguage(lang).name
                                )
                            );
                        })
                    )
                )
            )
        ),
        React.createElement(Version, null)
    );
}