const usersPageStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${THEME.size.appBar} - ${THEME.size.footer})`,
  },
  card: {
    background: THEME.palette.secondary.background,
    margin: "20px",
    color: THEME.palette.primary.text,

    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
  whiteText: {
    color: "white",
  },
  avatarLarge: {
    width: "150px",
    height: "150px",
    backgroundColor: "#484848",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  cardContent: {
    width: "calc(100% - 100px)",
    padding: "15px 20px",
    display: "flex",
    flexDirection: "column",
  },
  cardLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "5px 0",
    position: "relative"
  },
  greyText: {
    color: THEME.palette.secondary.text,
  },
  marginLeft: {
    marginLeft: "10px",
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
    textAlign: "center",
  }, 
  progressBarLabelTypo: {
    lineHeight: "20px"
  }
}));

function UsersPage(props) {
  const classes = usersPageStyles();

  const [users, setUsers] = React.useState([]);

  if (users.length === 0) {
    fetch(USERS_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setUsers(data.data);
        }
      });
  }

  function MakeAdmin(props) {
    if (props.admin) {
      return (
        <Typography
          variant="h5"
          className={makeClass(classes.greyText, classes.marginLeft)}
        >
          (Admin)
        </Typography>
      );
    } else {
      return "";
    }
  }

  function MakeLevel(props) {
    return (
      <React.Fragment>
        <Typography className={makeClass(classes.marginLeft, classes.level)}>
          {translateUserPage("level", props.lang) + props.level}
        </Typography>
        <div className={classes.progressBarContainer}>
          <LinearProgress
            variant="determinate"
            value={props.level.progress}
            className={makeClass(classes.progressBar, classes.marginLeft)}
          >
          </LinearProgress>
          <div className={classes.progressBarLabel}>
            <Typography className={classes.progressBarLabelTypo}>{translateUserPage("next_level", props.lang) + props.level.progress + "%"}</Typography>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      {users.map(user => {
        return {
          ...user, 
          level: new Level(user.xp)
        }
      }).sort((a, b) => (b.xp - a.xp)).map((user, id) => {
        return (
          <Card className={classes.card} key={id}>
            <CardContent className={classes.cardContainer}>
              <CardMedia
                className={classes.avatarLarge}
                image={getLocalImage(AVATAR_URL + "/" + user.id)}
              />
              <div className={classes.cardContent}>
                <div className={classes.cardLine}>
                  <Typography variant="h5">{user.name}</Typography>
                  <MakeAdmin admin={user.admin}></MakeAdmin>
                  <MakeLevel level={user.level} lang={props.lang}></MakeLevel>
                </div>
                <div className={classes.cardLine}>
                  <Typography className={makeClass(classes.greyText)}>
                    {DateFormatter(new Date(user.create_time))}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
