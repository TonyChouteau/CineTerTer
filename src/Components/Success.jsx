const successStyles = makeStyles((theme) => ({
  root: {
    color: "green",
  },
}));

function Success(props) {
  const classes = successStyles();

  if (props.success) {
    return (
      <Typography className={makeClass(classes.root, props.className)}>
        {props.children}
      </Typography>
    );
  } else {
    return "";
  }
}
