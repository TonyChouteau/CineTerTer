var successStyles = makeStyles(function (theme) {
    return {
        root: {
            color: "green"
        }
    };
});

function Success(props) {
    var classes = successStyles();

    if (props.success) {
        return React.createElement(
            Typography,
            { className: makeClass(classes.root, props.className) },
            props.children
        );
    } else {
        return "";
    }
}