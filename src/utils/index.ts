export function getFxTime(fxTime): string {
	return parseInt(fxTime.substring(11, 13)) + '时'
}

export function getFxDate(fxDate): string {
	const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	if (fxDate.slice(-2) === String(new Date().getDate())) {
		return '今天'
	} else {
		return week[new Date(fxDate).getDay()]
	}
}

export function checkIsDay(fxDate, sunrise, sunset): boolean {
	const now = new Date()
	const sunriseDate = new Date(fxDate + 'T' + sunrise + 'Z')
	const sunsetDate = new Date(fxDate + 'T' + sunset + 'Z')
	return now > sunriseDate && now < sunsetDate
}
export function checkIsProvince(adcode: string): boolean {
	return adcode.slice(2) === '0000'
}
export function checkIsCity(adcode: string): boolean {
	return !checkIsProvince(adcode) && adcode.slice(4) === '00'
}
export function checkIsCounty(adcode: string): boolean {
	return adcode.slice(4) !== '00'
}
export function calGeoPath(adcode: string): string {
	return adcode.slice(2, 4) === "00" ? `/province/${adcode}.json` : `/citys/${adcode}.json`
}
export function updateObsTime(obsTime) {
	// console.log(obsTime, obsTime.substring(11, 16))
	return obsTime.substring(11, 16)
}