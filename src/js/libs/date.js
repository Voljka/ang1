'use strict'

export function formattedToSave(dat) {
	var curr_date = dat.getDate();
	var curr_month = dat.getMonth() + 1;
	var curr_year = dat.getFullYear();

	return (curr_year + "-" + (curr_month < 10 ? "0"+curr_month : curr_month ) + "-" + (curr_date < 10 ? "0"+curr_date : curr_date ));
}

export function formattedToRu(dat) {
	var curr_date = dat.getDate();
	var curr_month = dat.getMonth() + 1;
	var curr_year = dat.getFullYear();

	return ((curr_date < 10 ? "0"+curr_date : curr_date ) + '-' + (curr_month < 10 ? "0"+curr_month : curr_month ) + '-' + curr_year);
}

export function datePlusDays(days, start_date) {
	if (! start_date)
		start_date = new Date();
	var result = start_date.setDate(start_date.getDate() + days);
	return 	result;
}

export function daysFromToday(specified_date) {
	var today = new Date();

	return ((specified_date - today)/24/60/60/1000).toFixed();
}
