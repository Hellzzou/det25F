import React from "react"
import { useHistory } from "react-router-dom"
import { getBetweenColSpan, getColSpan } from "../tools/date"
import { getFlightColor } from "../tools/tools"
import { flightCellProps } from "../types/BasicComponents"

export const FlightCell = (props: flightCellProps): JSX.Element => {
	const history = useHistory()
	const onFlightClick = () => {
		history.push(`/debriefFlight/${props.event._id}/${props.jAero}/${props.nAero}`)
	}
	return (
		<>
			{getBetweenColSpan(props.event, props.events) > 0 && (
				<td colSpan={getBetweenColSpan(props.event, props.events)}></td>
			)}
			<td
				key={props.events.indexOf(props.event)}
				className={`rounded bg-${getFlightColor(props.event)} align-middle container px-1`}
				colSpan={getColSpan(props.event)}
				onClick={onFlightClick}>
				<div className='row justify-content-center'>
					<div className='col-md-3'>
						{props.event.departureDate.split("T")[1].split(":")[0] +
							":" +
							props.event.departureDate.split("T")[1].split(":")[1]}
					</div>
					<div className='col-md-3'>T{props.event.aircraft}</div>
					<div className='col-md-3'>{props.event.fuel}</div>
					<div className='col-md-3'>
						{props.event.arrivalDate.split("T")[1].split(":")[0] +
							":" +
							props.event.arrivalDate.split("T")[1].split(":")[1]}
					</div>
				</div>
				<div className='row justify-content-center'>
					<div className='col-md-6'>{props.event.type}</div>
					<div className='col-md-6'>{props.event.mission}</div>
				</div>
				<div className='row text-center'>
					<div className='col-md-12'>
						{props.event.chief +
							" " +
							props.event.pilot +
							" " +
							props.event.crewMembers.reduce((acc, value) => (acc += value + " "), "")}
					</div>
				</div>
			</td>
		</>
	)
}
