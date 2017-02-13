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