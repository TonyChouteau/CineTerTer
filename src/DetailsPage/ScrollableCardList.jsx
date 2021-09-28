const scrollableStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        overflow: "auto",
    },
    list: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
    },
    card: {
        margin: "10px",
        overflow: "visible",
        background: THEME.palette.secondary.background,
        color: THEME.palette.primary.text,
    },
    media: {
        height: "250px",
        width: "200px",
        backgroundPosition: "top",
    },
    whiteText: {
        color: THEME.palette.primary.text,
    },
}));

function ScrollableCardList(props) {
    const classes = scrollableStyles();

    return (
        <div className={classes.root}>
            <div className={classes.list}>
                {props.data.slice(0, 10).map((item, id) => {
                    return (
                        <Card className={classes.card} key={item.name}>
                            <CardActionArea className={classes.button}>
                                <CardMedia
                                    className={classes.media}
                                    image={props.image(item)}
                                    title={props.title(item)}
                                    key={id}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h4">
                                        {props.title(item)}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {props.content(item)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
