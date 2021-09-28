var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var usersPageStyles = makeStyles(function (theme) {
    return {
        root: {
            minHeight: "calc(100vh - " + THEME.size.appBar + " - " + THEME.size.footer + ")"
        },
        card: {
            background: THEME.palette.secondary.background,
            margin: "20px",
            color: THEME.palette.primary.text,

            "& .MuiCardContent-root": {
                padding: 0
            }
        },
        whiteText: {
            color: "white"
        },
        avatarLarge: {
            width: "150px",
            height: "150px",
            backgroundColor: "#484848"
        },
        cardContainer: {
            display: "flex",
            flexDirection: "row",
            padding: 0
        },
        cardContent: {
            width: "calc(100% - 100px)",
            padding: "15px 20px",
            display: "flex",
            flexDirection: "column"
        },
        cardLine: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "5px 0",
            position: "relative"
        },
        greyText: {
            color: THEME.palette.secondary.text
        },
        marginLeft: {
            marginLeft: "10px"
        },
        level: {
            color: THEME.palette.primary.main,
            fontSize: "20px",
            position: "absolute",
            right: "210px"
        },
        progressBarContainer: {
            position: "absolute",
            right: 0
        },
        progressBar: {
            height: "20px",
            borderRadius: "10px",
            width: "200px",
            background: THEME.palette.primary.background
        },
        progressBarLabel: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            textAlign: "center"
        },
        progressBarLabelTypo: {
            lineHeight: "20px"
        }
    };
});

function UsersPage(props) {
    var classes = usersPageStyles();

    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        users = _React$useState2[0],
        setUsers = _React$useState2[1];

    if (users.length === 0) {
        fetch(USERS_URL, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data.status === 200) {
                setUsers(data.data);
            }
        });
    }

    function MakeAdmin(props) {
        if (props.admin) {
            return React.createElement(
                Typography,
                {
                    variant: "h5",
                    className: makeClass(classes.greyText, classes.marginLeft)
                },
                "(Admin)"
            );
        } else {
            return "";
        }
    }

    function MakeLevel(props) {
        var level = props.level;

        return React.createElement(
            React.Fragment,
            null,
            React.createElement(
                Typography,
                { className: makeClass(classes.marginLeft, classes.level) },
                translateUserPage("level", props.lang) + level.level
            ),
            React.createElement(
                "div",
                { className: classes.progressBarContainer },
                React.createElement(LinearProgress, {
                    variant: "determinate",
                    value: level.progress,
                    className: makeClass(classes.progressBar, classes.marginLeft)
                }),
                React.createElement(
                    "div",
                    { className: classes.progressBarLabel },
                    React.createElement(
                        Typography,
                        { className: classes.progressBarLabelTypo },
                        translateUserPage("next_level", props.lang) + level.progress + "%"
                    )
                )
            )
        );
    }

    return React.createElement(
        "div",
        { className: classes.root },
        users.map(function (user) {
            return Object.assign({}, user, {
                level: new Level(user.xp)
            });
        }).sort(function (a, b) {
            return b.xp - a.xp;
        }).map(function (user, id) {
            return React.createElement(
                Card,
                { className: classes.card, key: id },
                React.createElement(
                    CardContent,
                    { className: classes.cardContainer },
                    React.createElement(CardMedia, {
                        className: classes.avatarLarge,
                        image: getLocalImage(AVATAR_URL + "/" + user.id)
                    }),
                    React.createElement(
                        "div",
                        { className: classes.cardContent },
                        React.createElement(
                            "div",
                            { className: classes.cardLine },
                            React.createElement(
                                Typography,
                                { variant: "h5" },
                                user.name
                            ),
                            React.createElement(MakeAdmin, { admin: user.admin }),
                            React.createElement(MakeLevel, { level: user.level, lang: props.lang })
                        ),
                        React.createElement(
                            "div",
                            { className: classes.cardLine },
                            React.createElement(
                                Typography,
                                { className: makeClass(classes.greyText) },
                                DateFormatter(new Date(user.create_time))
                            )
                        )
                    )
                )
            );
        })
    );
}