function DateFormater(date) {
	if (!date) {
		date = new Date();
	}

	var dateFormatted = date.toLocaleDateString();
	var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	return dateFormatted + " " + time;
}