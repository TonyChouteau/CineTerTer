const errorStyles = makeStyles((theme) => ({
  root: {
    color: "red",
  },
}));

function Error(props) {
  const classes = errorStyles();

  if (props.error) {
    return (
      <Typography className={makeClass(classes.root, props.className)}>
        {props.children}
      </Typography>
    );
  } else {
    return "";
  }
}
