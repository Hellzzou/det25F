import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { AlertRow } from "../Articles/AlertRow"
import { FlightRow } from "../Articles/FlightRow"
import { OtherEvent } from "../Articles/OtherEventRow"
import { DB_URL } from "../Datas/datas"
import { currentMonday, days, inDays } from "../Datas/dates"
import { getSunsets } from "../tools/dateManager"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { newAlert, newEvent, flight, Nights } from "../types/Objects"
import { WeekNavBar } from "./WeekNavBar"
import sun from "../images/sun.png"
import moon from "../images/moon.png"
import { Button } from "../BasicComponents/Button"
import { FDVButton } from "../BasicComponents/FDVButton"
import { buildWeekAlerts, buildWeekEvents, buildWeekFlights } from "../tools/buildWeekEvents"

export const Week = (): JSX.Element => {
	const [monday, setMonday] = useState(currentMonday)
	const [weekFlights, setWeekFlights] = useState<Array<Array<flight>>>([])
	const [weekAlerts, setWeekAlerts] = useState<Array<Array<newAlert>>>([])
	const [weekEvents, setWeekEvents] = useState<Array<Array<newEvent>>>([])
	const [nights, setNights] = useState<Nights>([[]])
	const history = useHistory()
	const etat400Click = () => {
		console.log("Etat 400")
	}
	const crHebdoClick = () => {
		console.log("C/R hebdo")
	}
	const fdvClick = (date: Date) => {
		console.log(date)
	}
	const nextWeekClick = () => {
		setMonday(monday + 7 * inDays)
	}
	const previousWeekClick = () => {
		setMonday(monday - 7 * inDays)
	}
	const thisWeekClick = () => {
		setMonday(currentMonday)
	}
	const newEventClick = () => {
		history.push("/newFlight")
	}
	useAsyncEffect(async () => {
		const flights = await postFetchRequest<flight[]>(DB_URL + "flights/betweenTwoDates", {
			start: new Date(monday),
			end: new Date(monday + 7 * inDays),
		})
		const alerts = await postFetchRequest<newAlert[]>(DB_URL + "alerts/betweenTwoDates", {
			start: new Date(monday),
			end: new Date(monday + 7 * inDays),
		})
		const events = await postFetchRequest<newEvent[]>(DB_URL + "events/betweenTwoDates", {
			start: new Date(monday),
			end: new Date(monday + 7 * inDays),
		})
		if (typeof flights !== "string") setWeekFlights(buildWeekFlights(flights, monday))
		if (typeof alerts !== "string") setWeekAlerts(buildWeekAlerts(alerts, monday))
		if (typeof events !== "string") setWeekEvents(buildWeekEvents(events, monday))
		const nights = await getFetchRequest<Nights[]>(DB_URL + "nights")
		if (typeof nights !== "string") setNights(nights[0])
	}, [monday])
	return (
		<>
			<div className='row m-1 my-0'>
				<WeekNavBar
					nextClick={nextWeekClick}
					previousClick={previousWeekClick}
					nowClick={thisWeekClick}
					newEventClick={newEventClick}
					firstDay={monday}
				/>
				<table className='col-md-12 table table-secondary table-sm table-striped align-middle caption-top my-1'>
					<colgroup>
						<col width='11%'></col>
						<col width='82%'></col>
						<col width='7%'></col>
					</colgroup>
					<tbody>
						{days.map((day) => (
							<tr key={days.indexOf(day)}>
								<td>
									<div className='row'>
										<div className='col-md-6'>
											<div className='text-center'>{day}</div>
											<div className='text-center'>
												{new Date(monday + days.indexOf(day) * inDays).toLocaleDateString()}
											</div>
											<div>
												<FDVButton
													date={new Date(monday + days.indexOf(day) * inDays)}
													size={12}
													buttonColor='primary'
													buttonContent='FDV'
													onClick={() =>
														fdvClick(new Date(monday + days.indexOf(day) * inDays))
													}
												/>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='row'>
												<div className='col-md-4'>
													<img src={sun} className='d-inline mx-1 align-bottom' />
												</div>
												<div className='col-md-8'>
													{getSunsets(nights, monday, days.indexOf(day), "jour")}
												</div>
											</div>
											<div className='row'>
												<div className='col-md-4'>
													<img src={moon} className='d-inline mx-1 align-bottom' />
												</div>
												<div className='col-md-8'>
													{getSunsets(nights, monday, days.indexOf(day), "nuit")}
												</div>
											</div>
										</div>
									</div>
								</td>
								<td className='text-center'>
									<table width='100%'>
										<colgroup>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
											<col width='6.8%'></col>
										</colgroup>
										<FlightRow
											events={
												typeof weekFlights !== "undefined" ? weekFlights[days.indexOf(day)] : []
											}
											jAero={getSunsets(nights, monday, days.indexOf(day), "jour")}
											nAero={getSunsets(nights, monday, days.indexOf(day), "nuit")}
										/>
										<OtherEvent
											events={
												typeof weekEvents !== "undefined" ? weekEvents[days.indexOf(day)] : []
											}
										/>
									</table>
								</td>
								<td className='p-0'>
									<AlertRow
										events={typeof weekAlerts !== "undefined" ? weekAlerts[days.indexOf(day)] : []}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='row'>
				<div className='col-md-6 text-center'>
					<Button size={10} buttonContent='ETAT 400' buttonColor='primary' onClick={etat400Click} />
				</div>
				<div className='col-md-6 text-center'>
					<Button size={10} buttonContent='C/R HEBDO' buttonColor='primary' onClick={crHebdoClick} />
				</div>
			</div>
		</>
	)
}
