const changelogStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
  paper: {
    margin: "10px",
    padding: theme.spacing(3),
    background: THEME.palette.secondary.background,

    "& .MuiTypography-h4": {
      marginBottom: "20px",
    },
    "& .MuiTypography-h5": {
      marginBottom: "10px",
      marginTop: "10px",
    },
  },
  whiteText: {
    color: "white",
  },
  greyText: {
    color: THEME.palette.secondary.text,
  },
  multiline: {
    whiteSpace: "pre-wrap",
  },
  hr: {
    marginBottom: "20px",
    marginTop: "20px",
  },
}));

function ChangelogPage(props) {
  const classes = changelogStyles();

  const VERSIONS = [
    [
      0,
      "1.0",
      "Release of the web application for the first time. \nThe only actions possible for now are to edit your profile, view and add Reviews.",
    ],
    [
      1,
      "1.01",
      "Correct some bugs, password not hidden when typing. \nAdd success and error message.",
    ],
    [1, "1.02", "Add changelog in route and app drawer"],
  ];

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {VERSIONS.reverse().map((version, id) => {
          return (
            <React.Fragment key={id}>
              {version[0] === 0 ? <hr className={classes.hr} /> : ""}
              <Typography
                variant={"h" + (version[0] + 4)}
                className={classes.whiteText}
              >
                {"Beta " + version[1]}
              </Typography>
              <Typography
                className={makeClass(classes.grey, classes.multiline)}
              >
                {version[2]}
              </Typography>
            </React.Fragment>
          );
        })}
      </Paper>
    </div>
  );
}
