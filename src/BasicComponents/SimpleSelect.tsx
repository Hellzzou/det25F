import React from "react"
import { SimpleSelectProps } from "../types/BasicComponents"

export const SimpleSelect = (props: SimpleSelectProps): JSX.Element => {
	return (
		<div className={`col-md-${props.size}`}>
			<select
				className={`form-select bg-${props.backgroundColor} text-${props.textColor} text-center `}
				onChange={(e) => props.handleChange(e)}
				value={props.value}
				disabled={props.disabled ? props.disabled : false}>
				<option></option>
				{props.options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	)
}
