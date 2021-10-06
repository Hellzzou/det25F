import { inDays } from "../Datas/constants"
import { Alert, Conflict, CrewMember, Event, Flight, Holiday } from "../types/Objects"
import { returnHoursInInteger } from "./dateManager"

export const buildWeekFlights = (events: Flight[], startDate: number): Flight[][] =>
	events
		.reduce<Flight[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))

export const buildWeekAlerts = (events: Alert[], startDate: number): Alert[] =>
	events.reduce<Alert[]>((acc, flight) => {
		const flightDate = Math.floor((Date.parse(flight.departureDate) - startDate) / inDays)
		acc[flightDate] = flight
		return acc
	}, [])

export const buildWeekEvents = (events: Event[], startDate: number): Event[][] =>
	events
		.reduce<Event[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.departureDate) - 11 * 3600000 - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => Date.parse(a.departureDate) - Date.parse(b.departureDate)))
export const buildWeekHolidays = (events: Holiday[], startDate: number): Holiday[][] =>
	events
		.reduce<Holiday[][]>((acc, flight) => {
			const flightDate = Math.floor((Date.parse(flight.date) - startDate) / inDays)
			if (!acc[flightDate]) acc[flightDate] = []
			acc[flightDate].push(flight)
			return acc
		}, [])
		.map((day) => day.sort((a, b) => (a.type === "Perm PM" ? 12 : 8) - (b.type === "Perm PM" ? 12 : 8)))
export const buildWeekConflicts = (
	allMembers: CrewMember[],
	flights: Flight[][],
	events: Event[][],
	alerts: Alert[],
	holidays: Holiday[][]
): Record<string, string[]>[] => {
	const conflicts = Array.from(Array(7), () =>
		allMembers.reduce<Record<string, Conflict[]>>((acc, member) => {
			if (!acc[member.trigram]) acc[member.trigram] = []
			return acc
		}, {})
	)
	for (let i = 0; i < conflicts.length; i++) {
		if (flights[i])
			flights[i].reduce<Record<string, Conflict[]>>((acc, event) => {
				const departure =
					parseInt(event.departureDate.split("T")[1].split(":")[0]) +
					parseInt(event.departureDate.split("T")[1].split(":")[1]) / 60
				const arrival =
					parseInt(event.arrivalDate.split("T")[1].split(":")[0]) +
					parseInt(event.arrivalDate.split("T")[1].split(":")[1]) / 60
				;[event.chief, event.pilot, ...event.crewMembers].map((member) => {
					acc[member] = [...acc[member], { type: "flight", departure, arrival }]
				})
				return acc
			}, conflicts[i])
		if (events[i])
			events[i].reduce<Record<string, Conflict[]>>((acc, event) => {
				const departure =
					parseInt(event.departureDate.split("T")[1].split(":")[0]) +
					parseInt(event.departureDate.split("T")[1].split(":")[1]) / 60
				const arrival =
					parseInt(event.arrivalDate.split("T")[1].split(":")[0]) +
					parseInt(event.arrivalDate.split("T")[1].split(":")[1]) / 60
				event.members.map((member) => {
					acc[member] = [...acc[member], { type: "event", departure, arrival }]
				})
				return acc
			}, conflicts[i])
		if (alerts[i])
			[
				alerts[i].chief,
				alerts[i].pilot,
				alerts[i].mecbo,
				alerts[i].radio,
				alerts[i].nav,
				alerts[i].rdr,
				alerts[i].tech,
			].reduce<Record<string, Conflict[]>>((acc, member) => {
				acc[member] = [...acc[member], { type: "alert", departure: 0, arrival: 23.9 }]
				return acc
			}, conflicts[i])
		if (holidays[i])
			holidays[i].reduce<Record<string, Conflict[]>>((acc, event) => {
				const departure = event.type === "Perm PM" ? 12 : 8
				const arrival = event.type === "Perm AM" ? 12 : 16
				event.members.map((member) => {
					acc[member] = [...acc[member], { type: "holiday", departure, arrival }]
				})
				return acc
			}, conflicts[i])
	}
	const allConflicts = []
	for (let i = 0; i < 7; i++) {
		allConflicts[i] = allMembers.reduce<Record<string, string[]>>((acc, { trigram }) => {
			acc[trigram] = []
			const rupt = conflicts[i][trigram]
				.filter((event) => event.type === "flight")
				.sort((a, b) => a.departure - b.departure)
				.reduce<number>((acc, flight, index) => {
					if (
						(index === 0 && flight.arrival - flight.departure > 3) ||
						(flight.departure < 8 && flight.arrival > 17)
					)
						acc = flight.departure + 14
					else if (index !== 0 && acc === 30.5) acc = flight.departure + 14
					return acc
				}, 30.5)
			if (rupt < 30.5 && conflicts[i][trigram].filter((event) => event.type === "alert").length !== 0)
				acc[trigram].push("Rupture d'alerte")
			conflicts[i][trigram]
				.filter((event) => event.type === "flight")
				.map((flight) => {
					conflicts[i][trigram]
						.filter((event) => event.type === "event")
						.map((event) => {
							if (
								(event.departure > flight.departure && event.departure < flight.arrival) ||
								(event.arrival > flight.departure && event.arrival < flight.arrival) ||
								(event.departure <= flight.departure && event.arrival >= flight.arrival)
							)
								acc[trigram].push("évènement pendant un vol")
						})
					conflicts[i][trigram]
						.filter((event) => event.type === "holiday")
						.map((event) => {
							if (
								(event.departure > flight.departure && event.departure < flight.arrival) ||
								(event.arrival > flight.departure && event.arrival < flight.arrival) ||
								(event.departure <= flight.departure && event.arrival >= flight.arrival)
							)
								acc[trigram].push("vacances pendant un vol")
						})
				})
			conflicts[i][trigram]
				.filter((event) => event.type === "event")
				.map((event) => {
					conflicts[i][trigram]
						.filter((event) => event.type === "holiday")
						.map((holiday) => {
							if (
								(holiday.departure > event.departure && holiday.departure < event.arrival) ||
								(holiday.arrival > event.departure && holiday.arrival < event.arrival) ||
								(holiday.departure <= event.departure && holiday.arrival >= event.arrival)
							)
								acc[trigram].push("vacances pendant un évènement")
						})
				})
			return acc
		}, {})
	}
	console.log(allConflicts)
	return allConflicts
}
export const sortEventByRow = (events: Event[]): Event[][] => {
	let departureTime = 0
	const newRow: Event[] = []
	const currentRow: Event[] = []
	events.map((event) => {
		if (returnHoursInInteger(event.departureDate.split("T")[1].split(":")[0]) >= departureTime)
			currentRow.push(event)
		else newRow.push(event)
		departureTime = returnHoursInInteger(event.arrivalDate.split("T")[1].split(":")[0])
	})
	return newRow.length === 0 ? [currentRow] : [currentRow, ...sortEventByRow(newRow)]
}
export const sortHolidaysByRow = (events: Holiday[]): Holiday[][] => {
	let departureTime = 0
	const newRow: Holiday[] = []
	const currentRow: Holiday[] = []
	events.map((event) => {
		const eventDeparture = event.type === "Perm PM" ? 12 : 8
		if (eventDeparture >= departureTime) currentRow.push(event)
		else newRow.push(event)
		departureTime = event.type === "Perm AM" ? 12 : 16
	})
	return newRow.length === 0 ? [currentRow] : [currentRow, ...sortHolidaysByRow(newRow)]
}
