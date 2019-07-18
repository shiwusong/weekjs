const WEEK_TIME = 7 * 24 * 60 * 60 * 1000
// 获取上一个周一
function gPMD(d = new Date()) {
	d.setHours(0, 0, 0, 0)
	let day = d.getDay()
	let preMonday = new Date(d.getTime())
	if (day === 0) {
		preMonday.setDate(preMonday.getDate() - 6)
		return preMonday
	} else {
		preMonday.setDate(preMonday.getDate() - day + 1)
		return preMonday
	}
}

// 获取下一个周日
function gPSD(d = new Date()) {
	d.setHours(0, 0, 0, 0)
	const sunday = gPMD(d)
	sunday.setDate(sunday.getDate() + 6)
	return sunday
}
class Week {
	_c(d) {
		let _d = new Date(d.getTime())
		this.year = _d.getFullYear()
		this.month = _d.getMonth()
		// 年第一天 firstYearDay
		this.fYD = new Date(`${this.year}-1-1 00:00:00`)
		// 年最后一天 lastYearDay
		this.lYD = new Date(`${this.year}-12-31 00:00:00`)
		// 当前周的周一（当前周的第一天，整周模式） startDayFull
		this.sDF = gPMD(_d)
		// 当前周第一天 startDay
		this.sD = this.sDF.getTime() < this.fYD.getTime() ? new Date(`${this.year}-1-1 00:00:00`) : this.sDF
		// 当前周的周日 (当前周的最后一天 整周模式) endDayFull
		this.eDF = gPSD(_d)
		// 当前周最后一天 endDay
		this.eD = this.eDF.getTime() > this.lYD.getTime() ? new Date(`${this.year}-12-31 00:00:00`) : this.eDF
		// 当年第一个周一 firstYearMonday
		this.fYMD = gPMD(this.fYD)
		// 当年第一个整周周一 firstYearMondayFull
		if (this.fYMD.getTime() < this.fYD.getTime()) {
			this.fYMDF = gPSD(this.fYD)
			this.fYMDF.setDate(this.fYMDF.getDate() + 1)
		} else this.fYMDF = new Date(this.fYMD.getTime())
		// 当年最后一个周日 lastYearSunday
		this.lYSD = gPSD(this.lYD)
		return this
	}
	constructor(...params) {
		if (params.length === 0) {
			const d = new Date()
			d.setHours(0, 0, 0, 0)
			return this._c(d)
		} else if (params.length === 1) {
			if (params[0] instanceof Date) {
				const d = new Date(params[0].getTime())
				d.setHours(0, 0, 0, 0)
				return this._c(d)
			} else {
				return new Week(new Date().getFullYear(), ...params)
			}
		} else {
			const d = new Date(`${parseInt(params[0])}-1-1 00:00:00`)
			d.setDate(d.getDate() + parseInt(params[1]) * 7 - 7)
			return this._c(d)
		}
	}
	// 增加n周
	addWeek(n) {
		const d = new Date(this.sD.getTime())
		d.setDate(d.getDate() + 7 * n)
		return this._c(d)
	}
	// 减少n周
	subWeek(n) {
		return this.addWeek(-n)
	}
	// 获取当前年份
	getYear() {
		return this.year
	}
	// 获取当月月份
	getMonth() {
		return this.month + 1
	}
	// 获取当前第几周
	getWeek(full = false) {
		return Math.round((this.sDF.getTime() - (full ? this.fYMDF : this.fYMD).getTime()) / WEEK_TIME) + 1
	}
	// 获取当月第几周
	getWeekOfMonthYear(full = false, month = this.month + 1, year = this.year) {
		const firstMonthDay = new Date(`${year}-${month}-1 00:00:00`)
		const firstMonthMonday = gPMD(firstMonthDay)
		full &&
			firstMonthMonday.getTime() < firstMonthDay.getTime() &&
			firstMonthMonday.setDate(firstMonthMonday.getDate() + 7)
		return Math.round((this.sDF.getTime() - firstMonthMonday.getTime()) / WEEK_TIME) + 1
	}
	// 获取当年共几周
	getWeekCount(full = false) {
		return ~~((this.lYSD.getTime() - (full ? this.fYMDF : this.fYMD).getTime()) / WEEK_TIME) + 1
	}
	// 获取本周范围
	getRange(full = false) {
		return full ? [this.sDF, this.eDF] : [this.sD, this.eD]
	}
	// 获取本年范围（强制周一开始周日结束）
	getYearRange(full = false) {
		return full ? [this.fYMDF, this.lYSD] : [this.fYMD, this.lYSD]
	}
}
const weekjs = (...p) => new Week(...p)
weekjs.getPreMonday = gPMD
weekjs.getPostSunday = gPSD
module.exports = weekjs
