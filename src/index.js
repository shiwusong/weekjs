/**
 * class Week 周换算
 * new Week(year, week) | new Week(week) | new Week(new Date())
 */

const WT = 7 * 24 * 60 * 60 * 1000
// 获取上一个周一
function gPMD(d = new Date()) {
	let day = d.getDay()
	let pM = new Date(d.getTime())
	if (day === 0) {
		pM.setDate(pM.getDate() - 6)
		return pM
	} else {
		pM.setDate(pM.getDate() - day + 1)
		return pM
	}
}

// 获取下一个周日
function gPSD(d = new Date()) {
	const sD = gPMD(d)
	sD.setDate(sD.getDate() + 6)
	return sD
}
class Week {
	_c(d) {
		let _d = new Date(d.getTime())
		this.year = _d.getFullYear()
		// firstYearDay
		this.fYD = new Date(`${this.year}-1-1 00:00:00`)
		// lastYearDay
		this.lYD = new Date(`${this.year}-12-31 00:00:00`)
		// startDay
		this.sD = gPMD(_d).getTime() < this.fYD.getTime() ? new Date(`${this.year}-1-1 00:00:00`) : gPMD(_d)
		// endDay
		this.eD = gPSD(_d).getTime() > this.lYD.getTime() ? new Date(`${this.year}-12-31 00:00:00`) : gPSD(_d)
		// firstYearMonday
		this.fYMD = gPMD(this.fYD)
		// lastYearSunday
		this.lYSD = gPSD(this.lYD)
		return this
	}
	constructor(...p) {
		if (p.length === 0) {
			const d = new Date()
			d.setHours(0, 0, 0, 0)
			return this._c(d)
		} else if (p.length === 1) {
			if (p[0] instanceof Date) {
				const d = new Date(p[0].getTime())
				d.setHours(0, 0, 0, 0)
				return this._c(d)
			} else {
				return new Week(new Date().getFullYear(), ...p)
			}
		} else {
			const d = new Date(`${parseInt(p[0])}-1-1 00:00:00`)
			d.setDate(d.getDate() + parseInt(p[1]) * 7 - 7)
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
	// 获取当前第几周
	getWeek() {
		return Math.round((this.sD.getTime() - this.fYMD.getTime()) / WT + 1)
	}
	// 获取当年共几周
	getWeekCount() {
		return Math.round((gPMD(this.lYSD).getTime() - this.fYMD.getTime()) / WT) + 1
	}
	// 获取本周范围
	getRange() {
		return [this.sD, this.eD]
	}
	// 获取本年范围（强制周一开始周日结束）
	getYearRange() {
		return [this.fYMD, this.lYSD]
	}
}
const weekjs = (...p) => new Week(...p)
weekjs.prototype.gPMD = gPMD
weekjs.prototype.gPSD = gPSD
export default weekjs
