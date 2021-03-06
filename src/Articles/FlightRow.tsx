import React from "react"
import { FlightRowProps } from "../types/BasicComponents"
import { FlightCell } from "../BasicComponents/FlightCell"

export const FlightRow = (props: FlightRowProps): JSX.Element => {
	return (
		<tbody>
			<tr>
				{!!props.events &&
					props.events.map((event) => (
						<FlightCell
							events={props.events}
							event={event}
							key={props.events.indexOf(event)}
							jAero={props.jAero}
							nAero={props.nAero}
							date={props.date}
						/>
					))}
			</tr>
		</tbody>
	)
}
