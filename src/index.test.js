const weekjs = require('./index')
const assert = require('assert')

describe('解析测试', function() {
	before(function() {})

	it('传空参数', function() {
		assert.equal(weekjs().getYear(), new Date().getFullYear())
		assert.equal(weekjs().getMonth(), new Date().getMonth() + 1)
		assert.equal(
			weekjs()
				.getRange()[0]
				.getTime(),
			weekjs.getPreMonday(new Date()).getTime()
		)
		assert.equal(
			weekjs()
				.getRange()[1]
				.getTime(),
			weekjs.set235959(weekjs.getPostSunday(new Date())).getTime()
		)
	})

	it('传Date对象', function() {
		const d = new Date('2010-3-1')
		assert.equal(weekjs(d).getYear(), 2010)
		assert.equal(weekjs(d).getMonth(), 3)
		assert.equal(
			weekjs(d)
				.getRange()[0]
				.getTime(),
			weekjs.getPreMonday(d).getTime()
		)
		assert.equal(
			weekjs(d)
				.getRange()[1]
				.getTime(),
			weekjs.set235959(weekjs.getPostSunday(d)).getTime()
		)
	})

	it('传周数', function() {
		const d = new Date()
		assert.equal(weekjs(6).getYear(), d.getFullYear())
		assert.equal(weekjs(6).getWeek(), 6)
	})

	it('传年周', function() {
		const d = new Date('2019-5-1')
		assert.equal(weekjs(2019, 5).getYear(), d.getFullYear())
		assert.equal(weekjs(2019, 5).getWeek(), 5)
	})
})

describe('获取', function() {
	it('获取上一个周一', function() {
		assert.equal(weekjs.getPreMonday(new Date('2019-1-1')).getTime(), new Date('2018-12-31 00:00:00').getTime())
		assert.equal(weekjs.getPreMonday().getTime(), weekjs.getPreMonday(new Date()).getTime())
		assert.equal(weekjs.getPreMonday(new Date('2020-6-1')).getTime(), new Date('2020-6-1 00:00:00').getTime())
	})

	it('获取下一个周日', function() {
		assert.equal(weekjs.getPostSunday(new Date('2019-6-30')).getTime(), new Date('2019-6-30 00:00:00').getTime())
		assert.equal(weekjs.getPostSunday().getTime(), weekjs.getPostSunday(new Date()).getTime())
		assert.equal(weekjs.getPostSunday(new Date('2019-4-30')).getTime(), new Date('2019-5-5 00:00:00').getTime())
	})

	it('改变周数', function() {
		assert.equal(
			weekjs().getWeek() + 10,
			weekjs()
				.addWeek(10)
				.getWeek()
		)
		assert.equal(
			weekjs().getWeek() - 10,
			weekjs()
				.subWeek(10)
				.getWeek()
		)
	})

	it('获取周数', function() {
		assert.equal(weekjs(new Date('2019-1-1')).getWeek(), 1)
		assert.equal(weekjs(new Date('2019-1-6')).getWeek(true), 0)
		assert.equal(weekjs(new Date('2019-1-1')).getWeek(true), 0)
		assert.equal(weekjs(new Date('2019-1-7')).getWeek(), 2)
		assert.equal(weekjs(new Date('2019-1-7')).getWeek(true), 1)
	})

	it('获取当月周数', function() {
		assert.equal(weekjs(new Date('2019-1-1')).getWeekOfMonth(), 1)
		assert.equal(weekjs(new Date('2019-1-1')).getWeekOfMonth(true), 5)
		assert.equal(weekjs(new Date('2019-4-1')).getWeekOfMonth(true), 1)
		assert.equal(weekjs(new Date('2019-5-1')).getWeekOfMonth(true), 5)
		assert.equal(weekjs(new Date('2019-1-21')).getWeekOfMonth(), 4)
		assert.equal(weekjs(new Date('2019-1-21')).getWeekOfMonth(true), 3)
	})

	it('获取当年总周数', function() {
		assert.equal(weekjs(new Date('2019-1-1')).getWeekCount(), 53)
		assert.equal(weekjs(new Date('2019-1-1')).getWeekCount(true), 52)
		assert.equal(weekjs(new Date('2018-1-1')).getWeekCount(), 53)
		assert.equal(weekjs(new Date('2018-1-1')).getWeekCount(true), 53)
	})

	it('获取本周范围', function() {
		assert.equal(
			weekjs(new Date('2019-1-2'))
				.getRange()[0]
				.getTime(),
			new Date('2019-1-1 00:00:00').getTime()
		)
		assert.equal(
			weekjs(new Date('2019-1-2'))
				.getRange(true)[0]
				.getTime(),
			new Date('2018-12-31 00:00:00').getTime()
		)
		assert.equal(
			weekjs(new Date('2019-1-2'))
				.getRange()[1]
				.getTime(),
			weekjs.set235959(new Date('2019-1-6 00:00:00')).getTime()
		)
		assert.equal(
			weekjs(new Date('2018-12-31'))
				.getRange()[0]
				.getTime(),
			new Date('2018-12-31 00:00:00').getTime()
		)
		assert.equal(
			weekjs(new Date('2018-12-31'))
				.getRange()[1]
				.getTime(),
			weekjs.set235959(new Date('2018-12-31 00:00:00')).getTime()
		)
		assert.equal(
			weekjs(new Date('2018-12-31'))
				.getRange(true)[1]
				.getTime(),
			weekjs.set235959(new Date('2019-1-6 00:00:00')).getTime()
		)
	})

	it('获取本年范围', function() {
		assert.equal(
			weekjs(new Date('2019-1-1'))
				.getYearRange()[0]
				.getTime(),
			new Date('2018-12-31 00:00:00').getTime()
		)
		assert.equal(
			weekjs(new Date('2019-1-1'))
				.getYearRange(true)[0]
				.getTime(),
			new Date('2019-1-7 00:00:00').getTime()
		)
		assert.equal(
			weekjs(new Date('2019-1-1'))
				.getYearRange()[1]
				.getTime(),
			weekjs.set235959(new Date('2020-1-5 00:00:00')).getTime()
		)
		assert.equal(
			weekjs(new Date('2019-1-1'))
				.getYearRange(true)[1]
				.getTime(),
			weekjs.set235959(new Date('2020-1-5 00:00:00')).getTime()
		)
	})
})
