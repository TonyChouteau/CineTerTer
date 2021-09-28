const movieReviewsStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    titlePaper: {
        background: THEME.palette.secondary.background,
        color: THEME.palette.primary.text,
        padding: "5px 0",
    },
    margin: {
        margin: "10px",
    },
    centerText: {
        textAlign: "center",
    },
    flexRow: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    whiteText: {
        color: "white",
    },
    head: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    card: {
        width: "calc(100% - 20px)",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        background: "unset",
    },
    reviewContentContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingBottom: "16px",
    },
    reviewContent: {
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 50px)",
        paddingLeft: "10px",
    },
    overlayContainer: {
        position: "relative",
    },
    inputRoot: {
        margin: theme.spacing(1),
        width: "40%",
        "& label": {
            color: THEME.palette.primary.text,
        },
        "& textarea": {
            color: THEME.palette.primary.text,
        },
        "& input": {
            color: THEME.palette.primary.text,
        },
    },
    fullWidth: {
        width: "100%",
    },
    content: {
        padding: "0 26px",
    },
    media: {
        height: "50px",
        width: "50px",
        borderRadius: "25px",
        backgroundPosition: "top",
    },
    title: {
        fontSize: "18px",
    },
    submitButton: {
        width: "200px",
        height: "50px",
        marginTop: "27px",
    },
    marginLeft: {
        marginLeft: "10px",
    },
    error: {
        color: "red",
    },
    overlay: {
        position: "absolute",
        background: THEME.palette.primary.background,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 5,
        justifyContent: "center",
    },
    multiline: {
        whiteSpace: "pre-wrap",
    },
    height: {
        height: "100px",
    },
    greyText: {
        color: THEME.palette.secondary.text,
    },
}));

function MovieReviews(props) {
    const classes = movieReviewsStyles();

    const [state, setState] = React.useState({
        reviews: null,
        error: false,
        submit: false,
        errorMessage: null,
    });
    const newReviewData = {
        reviewRating: 0,
        reviewIsRating: true,
        inCinema: false,
        isFirstTime: true,
        isSpoiler: false,
    };

    // Rating
    function onRatingChange(rating) {
        newReviewData.reviewRating = rating;
    }

    function hideRating(isChecked) {
        if (isChecked) {
            $(".rating_edit").hide();
            newReviewData.reviewIsRating = false;
        } else {
            $(".rating_edit").show();
            newReviewData.reviewIsRating = true;
        }
    }

    // Checkbox

    function changeInCinema() {
        newReviewData.inCinema = !newReviewData.inCinema;
    }

    function changeIsFirstTime() {
        newReviewData.isFirstTime = !newReviewData.isFirstTime;
    }

    function changeIsSpoiler() {
        newReviewData.isSpoiler = !newReviewData.isSpoiler;
    }

    // Submit
    function onSubmit() {
        const title = $("input", ".review_title").val();
        const content = $("textarea", ".review_content").val();
        if (title.length < 3 || content.length < 20) {
            setState({
                ...state,
                error: true,
                errorMessage: translateAll("not_enough", props.lang),
            });
            return "";
        }
        fetch(getReviewsUrl(props.movieId), {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                title: title,
                content: content,
                rating: newReviewData.reviewIsRating
                    ? newReviewData.reviewRating
                    : null,
                inCinema: newReviewData.inCinema,
                isFirstTime: newReviewData.isFirstTime,
                isSpoiler: newReviewData.isSpoiler,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 201) {
                    console.log(data);
                    setState({
                        ...state,
                        error: false,
                        submit: true,
                        reviews: null,
                        errorMessage: null,
                    });
                } else {
                    setState({
                        ...state,
                        errorMessage: data.error || translateAll("error", props.lang),
                    });
                }
            });
    }

    if (!state.reviews) {
        fetch(getReviewsUrl(props.movieId), {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    setState({...state, reviews: data.data});
                }
            });
    }

    function RenderSubmit() {
        if (state.submit) {
            return (
                <div className={makeClass(classes.overlay, classes.flexRow)}>
                    <Typography className={classes.whiteText} variant="h6">
                        {translateMoviePage("submit", props.lang)}
                    </Typography>
                </div>
            );
        } else {
            return "";
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.head}>
                <Typography
                    className={makeClass(classes.margin, classes.centerText)}
                    variant="h5"
                >
                    {translateMoviePage("review", props.lang)}
                </Typography>
                <Card
                    className={classes.card}
                    style={{border: "none", boxShadow: "none"}}
                >
                    <CardContent
                        className={makeClass(
                            classes.overlayContainer,
                            state.submit ? classes.height : ""
                        )}
                    >
                        <RenderSubmit></RenderSubmit>
                        <Typography
                            className={makeClass(classes.margin, classes.whiteText)}
                            variant="h6"
                        >
                            {translateMoviePage("add_review_title", props.lang)}
                        </Typography>
                        <div className={classes.flexRow}>
                            <TextField
                                className={makeClass(
                                    classes.inputRoot,
                                    classes.whiteText,
                                    "review_title"
                                )}
                                variant="outlined"
                                label={translateMoviePage("review_title", props.lang)}
                            ></TextField>
                            <CheckBoxLabel
                                className={classes.marginLeft}
                                onClick={changeInCinema}
                                label={translateMoviePage("in_cinema", props.lang)}
                            ></CheckBoxLabel>
                            <CheckBoxLabel
                                className={classes.marginLeft}
                                onClick={changeIsFirstTime}
                                checked={true}
                                label={translateMoviePage("is_first_time", props.lang)}
                            ></CheckBoxLabel>
                            <CheckBoxLabel
                                className={classes.marginLeft}
                                onClick={changeIsSpoiler}
                                label={translateMoviePage("is_spoiler", props.lang)}
                            ></CheckBoxLabel>
                        </div>
                        <TextField
                            className={makeClass(
                                classes.inputRoot,
                                classes.fullWidth,
                                classes.whiteText,
                                "review_content"
                            )}
                            variant="outlined"
                            label={translateMoviePage("review_comment", props.lang)}
                            multiline
                        ></TextField>
                        <div className={classes.flexRow}>
                            <CheckBoxLabel
                                className={classes.marginLeft}
                                onClick={hideRating}
                                label={translateMoviePage("is_rating", props.lang)}
                            ></CheckBoxLabel>
                            <Rating
                                className={makeClass(classes.margin, "rating_edit")}
                                value={5}
                                input={true}
                                changeReview={onRatingChange}
                            ></Rating>
                        </div>
                        <Error
                            error={state.error}
                            className={makeClass(classes.error, classes.marginLeft)}
                        >
                            {state.errorMessage || translateMoviePage("error", props.lang)}
                        </Error>
                        <Button
                            id="login"
                            variant="contained"
                            color="primary"
                            className={makeClass(
                                classes.inputRoot,
                                classes.whiteText,
                                classes.submitButton
                            )}
                            onClick={onSubmit}
                        >
                            {translateMoviePage("add_review", props.lang)}
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.content}>
                <Typography
                    className={makeClass(classes.margin, classes.whiteText)}
                    variant="h6"
                >
                    {translateMoviePage("list_reviews_title", props.lang)}
                </Typography>
                {(state.reviews || []).map((review, id) => {
                    return (
                        <Card className={classes.card} key={id}>
                            <CardContent className={classes.reviewContentContainer}>
                                <div>
                                    <CardMedia
                                        className={classes.media}
                                        image={getLocalImage(AVATAR_URL + "/" + review.user_id)}
                                    />
                                </div>
                                <div className={classes.reviewContent}>
                                    <Typography
                                        className={makeClass(
                                            classes.margin,
                                            classes.whiteText,
                                            classes.title
                                        )}
                                    >
                                        {review.title}
                                    </Typography>
                                    <Typography
                                        className={makeClass(classes.margin, classes.greyText)}
                                    >
                                        {review.user.name} - {DateFormatter(review.create_time)}
                                    </Typography>
                                    <Rating value={review.grade}></Rating>
                                    <Typography
                                        className={makeClass(
                                            classes.margin,
                                            classes.whiteText,
                                            classes.multiline
                                        )}
                                    >
                                        {review.content.replace("\n")}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
