var errorStyles = makeStyles(function (theme) {
    return {
        root: {
            color: "red"
        }
    };
});

function Error(props) {
    var classes = errorStyles();

    if (props.error) {
        return React.createElement(
            Typography,
            { className: makeClass(classes.root, props.className) },
            props.children
        );
    } else {
        return "";
    }
}