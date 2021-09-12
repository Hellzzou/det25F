import React, { useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { DB_URL } from "../Datas/datas"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { EventFieldset } from "../Sections/EventFieldset"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { postFetchRequest } from "../tools/fetch"
import { fullfillEvent } from "../tools/fullfillForms"
import { buildNewEvent } from "../tools/buildEvents"
import { tokenCheck } from "../tools/user"
import { formValidity } from "../tools/validators"
import { newEvent } from "../types/Objects"

export const NewEventForm = ({ match }: RouteComponentProps<{ id: string }>): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [event, setEvent] = useState(INITIAL_FALSE_CONTROL)
	const hooks = [departureDate, departureTime, arrivalDate, arrivalTime, event]
	const setters = [setDepartureDate, setDepartureTime, setArrivalDate, setArrivalTime, setEvent]
	const returnClick = () => history.push("/activities")
	async function addEventClick() {
		const newEvent = buildNewEvent(hooks)
		const saved = await postFetchRequest<string>(DB_URL + "events/save", { newEvent })
		if (saved === "success") history.push("/activities")
	}
	async function modifyEventClick() {
		const newEvent = buildNewEvent(hooks)
		const deleted = await postFetchRequest<string>(DB_URL + "events/deleteOne", { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest<string>(DB_URL + "events/save", { newEvent })
			if (res === "success") history.push("/activities")
		}
	}
	async function deleteClick() {
		const deleted = await postFetchRequest<string>(DB_URL + "events/deleteOne", { id: match.params.id })
		if (deleted === "success") history.push("/activities")
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (match.params.id !== "newOne") {
			const event = await postFetchRequest<newEvent[]>(DB_URL + "events/findWithId", { id: match.params.id })
			if (typeof event !== "string") fullfillEvent(event[0], setters)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<NewEventNavBar />
			<form className='bg-white m-1 rounded text-dark row justify-content-center'>
				<Legend title='Nouveau évènement' />
				<div className='col-md-6 m-1 justify-content-center'>
					<TimingFieldset
						startDate={departureDate}
						setStartDate={setDepartureDate}
						startTime={departureTime}
						setStartTime={setDepartureTime}
						endDate={arrivalDate}
						setEndDate={setArrivalDate}
						endTime={arrivalTime}
						setEndTime={setArrivalTime}
					/>
				</div>
				<div className='col-md-6 m-1 justify-content-center'>
					<EventFieldset event={event} setEvent={setEvent} />
				</div>
			</form>
			<AddOrReturnButtons
				validity={formValidity(hooks)}
				addContent={match.params.id !== "newOne" ? "Modifier" : "Ajouter"}
				addClick={match.params.id !== "newOne" ? modifyEventClick : addEventClick}
				deleteClick={deleteClick}
				disableDelete={match.params.id === "newOne"}
				returnClick={returnClick}
			/>
		</>
	)
}
