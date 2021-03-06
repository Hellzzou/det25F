import React from "react"
import {
	Control,
	ControlArray,
	Alert,
	Event,
	Flight,
	PilotDateTPA,
	MecboDateTPA,
	RadioDateTPA,
	DenaeDateTPA,
	Holiday,
} from "./Objects"

export type NavButtonProps = {
	content: string
	link: string
}
export type ButtonProps = {
	size: number
	buttonColor: string
	buttonContent: string
	onClick: () => void
	disabled?: boolean
}
export type FDVButtonProps = {
	date: Date
	size: number
	buttonColor: string
	buttonContent: string
	onClick: (arg: Date) => void
	disabled?: boolean
}
export type WeekNavBarProps = {
	previousClick: () => void
	nextClick: () => void
	nowClick: () => void
	newEventClick: () => void
	firstDay: number
}
export type FlightRowProps = {
	events: Array<Flight>
	jAero: string
	nAero: string
	date: number
}
export type AlertRowProps = {
	events: Alert
	date: number
	week: number
}
export type OtherEventProps = {
	events: Array<Event>
	date: number
}
export type HolidaysRowProps = {
	holidays: Array<Holiday>
	date: number
}
export type LabelProps = {
	title: string
	size: number
}
export type InputProps = {
	size: number
	backgroundColor: string
	textColor: string
	type: string
	min: number
	max: number
	placeholder?: string
	control: Control
	setControl: React.Dispatch<React.SetStateAction<Control>>
	validator: (arg0: string) => boolean
	disabled?: boolean
}
export type LegendProps = {
	title: string
}
export type SelectProps = {
	size: number
	backgroundColor: string
	textColor: string
	control: Control
	setControl: React.Dispatch<React.SetStateAction<Control>>
	options: Array<string>
	validator: (arg0: string) => boolean
}
export type SimpleSelectProps = {
	size: number
	backgroundColor: string
	textColor: string
	value: string
	options: Array<string>
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	disabled?: boolean
}
export type UncontrolledSelectProps = {
	size: number
	backgroundColor: string
	textColor: string
	options: Array<string>
}
export type TextAreaProps = {
	size: number
	backgroundColor: string
	textColor: string
	control: ControlArray
	validator: (arg0: string) => boolean
}
export type FlightCellProps = {
	events: Array<Flight>
	event: Flight
	jAero: string
	nAero: string
	date: number
}
export type SwitchProps = {
	control: { name: string; value: boolean }
	size: number
	handleChange: (arg0: { name: string; value: boolean }) => void
}
export type UnvalidateInputProps = {
	size: number
	backgroundColor: string
	textColor: string
	type: string
	placeholder?: string
	control: { name: string; value: string; validity?: boolean }
	handleChange: (e: React.ChangeEvent<HTMLInputElement>, arg1: { name: string; value: string }) => void
	disabled?: boolean
}
export type CrewTPACardProps = {
	member: {
		name: string
		TPA: PilotDateTPA | MecboDateTPA | RadioDateTPA | DenaeDateTPA
	}
	date: Date
}
export type AlertToastProps = {
	color: string
	info: string
	show: boolean
	onClose: () => void
}
export type TPALineProps = {
	title: string
	color: string
	value: string
}
export type PasswordInputProps = {
	type: string
	password: Control
	info: { color: string; value: string }
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>
}
