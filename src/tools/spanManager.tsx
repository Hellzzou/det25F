import { Flight, Event, UpgradedGroup, Holiday } from "../types/Objects"

export const getBetweenColSpan = (event: Flight | Event, events: Array<Flight | Event>): number => {
	const departure = new Date(event.departureDate).getUTCHours() + new Date(event.departureDate).getUTCMinutes() / 60
	const arrival = new Date(event.arrivalDate).getUTCHours() + new Date(event.arrivalDate).getUTCMinutes() / 60
	if (events.indexOf(event) !== 0) {
		if (arrival >= 20) {
			return (
				34 -
				Math.max(arrival - departure, 3) * 2 -
				new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCHours() -
				7
			)
		}
		return (
			(departure -
				(new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCHours() +
					new Date(events[events.indexOf(event) - 1].arrivalDate).getUTCMinutes() / 60)) *
			2
		)
	}
	if (arrival >= 20 && events.indexOf(event) === 0) return 27 - Math.max(arrival - departure, 3) * 2
	return Math.ceil((departure - 7) * 2)
}
export const getBetweenColSpanHoliday = (event: Holiday, events: Array<Holiday>): number => {
	const departure = event.type === "Perm PM" ? 12 : 8
	if (events.indexOf(event) !== 0) {
		return (departure - (events[events.indexOf(event) - 1].type === "Perm AM" ? 12 : 16)) * 2
	}
	return (departure - 7) * 2
}
export const getColSpan = (event: Flight | Event): number => {
	const departure = new Date(event.departureDate).getUTCHours() + new Date(event.departureDate).getUTCMinutes() / 60
	const arrival = new Date(event.arrivalDate).getUTCHours() + new Date(event.arrivalDate).getUTCMinutes() / 60
	return Math.max(arrival - departure, 2.5) * 2
}
export const getColSpanHoliday = (event: Holiday): number => {
	const departure = event.type === "Perm PM" ? 12 : 8
	const arrival = event.type === "Perm AM" ? 12 : 16
	return (arrival - departure) * 2
}
export const allocRowSpan = (groups: UpgradedGroup[], index: number): number => {
	let rowSpan = 1
	let i = index
	if (i + 1 < groups.length && groups[i + 1].allocation !== -1) return 1
	while (i + 1 < groups.length && groups[i + 1].allocation === -1) {
		rowSpan += 1
		i++
	}
	return rowSpan
}
