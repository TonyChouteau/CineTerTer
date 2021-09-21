function DateFormatter(str) {
	var date = void 0;

	if (str) {
		date = new Date(str.toUTCString().replace("GMT", ""));
	} else {
		date = new Date();
	}

	var dateFormatted = date.toLocaleDateString();
	var time = date.toLocaleTimeString();

	return dateFormatted + " " + time;
}