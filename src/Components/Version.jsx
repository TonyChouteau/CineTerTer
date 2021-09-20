const versionStyles = makeStyles((theme) => ({
	root: {
		margin: "10px",
		textAlign: "center",
	}
}));

function Version() {
  const classes = versionStyles();

	return <Typography className={classes.root}>
		{VERSION}
	</Typography>
}