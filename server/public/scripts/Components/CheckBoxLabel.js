var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var checkBoxStyles = makeStyles(function (theme) {
    return {};
});

function CheckBoxLabel(props) {
    var classes = checkBoxStyles();

    var _React$useState = React.useState(props.checked || false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        checked = _React$useState2[0],
        setChecked = _React$useState2[1];

    function onClick() {
        var isChecked = !checked;
        setChecked(isChecked);
        if (props.onClick) {
            props.onClick(isChecked);
        }
    }

    return React.createElement(
        FormGroup,
        { className: props.className || "" },
        React.createElement(FormControlLabel, {
            control: React.createElement(Checkbox, { onClick: onClick, checked: checked }),
            label: props.label,
            variant: "outlined"
        })
    );
}