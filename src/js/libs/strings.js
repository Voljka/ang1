'use strict'

export function toSafeString(str) {
	var result = str.replace(/\&/g, '&#38;');
	result = result.replace(/\'/g, '&#39;');
	result = result.replace(/\"/g, '&#34;');
	return result;
}

export function toUnsafeString(str) {
	var result = str.replace(/&#38;/g, '&');
	result = result.replace(/&#34;/g, '\"');
	result = result.replace(/&#39;/g, '\'');
	result = result.replace(/&amp;/g, '&');
	return result;
}