import { inDays } from "../Datas/dates"
import { old } from "../Datas/dateTPA"
import { newEvent, flight, Nights } from "../types/Objects"

export const getWeekNumber = (date: number): number => {
	let i = 0
	for (i; i <= 7; i++) if (new Date(new Date(date).getFullYear(), 0, i).getDay() === 0) break
	const firstMonday = Date.parse(new Date(new Date(date).getFullYear(), 0, i).toDateString())
	return Math.ceil((date - firstMonday) / 1000 / 60 / 60 / 24 / 7)
}
export const findNumberOfWeeks = (): number => {
	let i = 0
	for (i; i <= 7; i++) if (new Date(new Date().getFullYear(), 0, 31 - i).getDay() === 0) break
	return getWeekNumber(Date.parse(new Date(new Date().getFullYear(), 11, 31 - i).toDateString()))
}
export const getBetweenColSpan = (event: flight | newEvent, events: Array<flight | newEvent>): number => {
	if (events.indexOf(event) !== 0) {
		return (
			returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) -
			returnHoursInInteger(events[events.indexOf(event) - 1].arrivalDate.split("T")[1].split(":")[0])
		)
	}
	if (returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0]) >= 20)
		return (
			14 -
			Math.max(
				returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0]) -
					returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]),
				3
			)
		)
	return returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) - 6
}
export const getColSpan = (event: flight | newEvent): number => {
	return Math.max(new Date(event.arrivalDate).getUTCHours() - new Date(event.departureDate).getUTCHours(), 3)
}
export const getSunsets = (nights: Nights, monday: number, date: number, type: string): string => {
	const thisDate = new Date(monday + date * inDays)
	if (typeof nights[0][0] !== "undefined")
		return type === "jour"
			? nights[thisDate.getMonth()][thisDate.getDate() - 1].jour + "L"
			: nights[thisDate.getMonth()][thisDate.getDate() - 1].nuit + "L"
	return ""
}
export const sortEventByRow = (events: newEvent[]): newEvent[][] => {
	let departureTime = 0
	const newRow: newEvent[] = []
	const currentRow: newEvent[] = []
	events.map((event) => {
		if (returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) >= departureTime)
			currentRow.push(event)
		else newRow.push(event)
		departureTime = returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0])
	})
	return newRow.length === 0 ? [currentRow] : [currentRow, ...sortEventByRow(newRow)]
}
export const returnHoursInInteger = (value: string): number => {
	if (value.split("")[0] === "0") return parseInt(value.split("")[1])
	return parseInt(value)
}
export const getAnnual = (date: Date, dateToCompare: number): string => {
	const lastYear = new Date(new Date().getFullYear(), dateToCompare - 12, 1)
	const lastMonth = new Date(new Date().getFullYear(), dateToCompare - 11, 1)
	return date < lastYear ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getQuadri = (date: Date, dateToCompare: number): string => {
	const fourMonths = new Date(new Date().getFullYear(), dateToCompare - 4, 1)
	const lastMonth = new Date(new Date().getFullYear(), dateToCompare - 3, 1)
	return date < fourMonths ? "danger" : date < lastMonth ? "warning" : "success"
}
export const getMonthly = (date: Date, dateToCompare: number): string => {
	return date.getMonth() === dateToCompare ? "success" : "danger"
}
export const getDone = (date: Date): string => {
	return date !== old ? "success" : "danger"
}
export const getDurationsValidity = (duration: number, durationToCompare: number): string => {
	if (duration < durationToCompare - durationToCompare / 4) return "danger"
	if (duration < durationToCompare) return "warning"
	return "success"
}
export const getDateNumber = (number: number): string => (number < 10 ? "0" + number : number.toString())
export const getMonthNumber = (number: number): string => (number < 10 ? "0" + (number + 1) : (number + 1).toString())
export const INITIAL_STARTDATE_CONTROL = {
	value: new Date().getFullYear() + "-" + getMonthNumber(new Date().getMonth()) + "-01",
	validity: true,
	disabled: false,
}
export const INITIAL_ENDDATE_CONTROL = {
	value:
		new Date().getFullYear() +
		"-" +
		getMonthNumber(new Date().getMonth()) +
		"-" +
		getDateNumber(new Date().getDate()),
	validity: true,
	disabled: false,
}
