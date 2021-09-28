const checkBoxStyles = makeStyles((theme) => ({}));

function CheckBoxLabel(props) {
    const classes = checkBoxStyles();

    const [checked, setChecked] = React.useState(props.checked || false);

    function onClick() {
        let isChecked = !checked;
        setChecked(isChecked);
        if (props.onClick) {
            props.onClick(isChecked);
        }
    }

    return (
        <FormGroup className={props.className || ""}>
            <FormControlLabel
                control={<Checkbox onClick={onClick} checked={checked}/>}
                label={props.label}
                variant="outlined"
            />
        </FormGroup>
    );
}
