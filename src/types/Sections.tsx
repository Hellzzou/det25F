import { control, controlArray, crewTPA, denaeTPA, mecboTPA, pilotEQA, pilotTPA, radioTPA } from "./Objects"

export type weekProps = {
	date: Date
}
export type timingFieldsetProps = {
	startDate: control
	setStartDate: React.Dispatch<React.SetStateAction<control>>
	startTime: control
	setStartTime: React.Dispatch<React.SetStateAction<control>>
	endDate: control
	setEndDate: React.Dispatch<React.SetStateAction<control>>
	endTime: control
	setEndTime: React.Dispatch<React.SetStateAction<control>>
	jAero?: string
	nAero?: string
}
export type missionFieldsetProps = {
	aircraft: control
	setAircraft: React.Dispatch<React.SetStateAction<control>>
	fuel: control
	setFuel: React.Dispatch<React.SetStateAction<control>>
	config: control
	setConfig: React.Dispatch<React.SetStateAction<control>>
	type: control
	setType: React.Dispatch<React.SetStateAction<control>>
	mission: control
	setMission: React.Dispatch<React.SetStateAction<control>>
	area: control
	setArea: React.Dispatch<React.SetStateAction<control>>
	NCArea: control
	setNCArea: React.Dispatch<React.SetStateAction<control>>
}
export type crewFieldsetProps = {
	chief: control
	setChief: React.Dispatch<React.SetStateAction<control>>
	CDAList: Array<string>
	pilot: control
	setPilot: React.Dispatch<React.SetStateAction<control>>
	pilotList: Array<string>
	crewMembers: controlArray
	setCrewMembers: React.Dispatch<React.SetStateAction<controlArray>>
	addableCrewMembers: Array<string>
	deleteMemberSelect: control
	setDeleteMemberSelect: React.Dispatch<React.SetStateAction<control>>
	addMemberSelect: control
	setAddMemberSelect: React.Dispatch<React.SetStateAction<control>>
	addCrewMember: () => void
	deleteCrewMember: () => void
}
export type addOrReturnButtonsProps = {
	addContent: string
	validity: boolean
	returnClick: () => void
	addClick: () => void
}
export type eventFieldsetProps = {
	event: control
	setEvent: React.Dispatch<React.SetStateAction<control>>
}
export type alertFieldsetProps = {
	departureDate: control
	setDepartureDate: React.Dispatch<React.SetStateAction<control>>
	chief: control
	setChief: React.Dispatch<React.SetStateAction<control>>
	pilot: control
	setPilot: React.Dispatch<React.SetStateAction<control>>
	mecbo: control
	setMecbo: React.Dispatch<React.SetStateAction<control>>
	nav: control
	setNav: React.Dispatch<React.SetStateAction<control>>
	rdr: control
	setRdr: React.Dispatch<React.SetStateAction<control>>
	radio: control
	setRadio: React.Dispatch<React.SetStateAction<control>>
}
export type debriefTimingFieldsetProps = {
	onDayDuration: control
	setOnDayDuration: React.Dispatch<React.SetStateAction<control>>
	onNightDuration: control
	setOnNightDuration: React.Dispatch<React.SetStateAction<control>>
	group: control
	setGroup: React.Dispatch<React.SetStateAction<control>>
	belonging: control
	setBelonging: React.Dispatch<React.SetStateAction<control>>
	done: control
	setDone: React.Dispatch<React.SetStateAction<control>>
	cause: control
	setCause: React.Dispatch<React.SetStateAction<control>>
}
export type crewTPAFieldsetProps = {
	chief: control
	pilot: control
	crewTPA: crewTPA
	setCrewTPA: React.Dispatch<React.SetStateAction<crewTPA>>
	pilotTPA: Array<pilotTPA>
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<pilotTPA>>>
	mecboTPA: Array<mecboTPA>
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<mecboTPA>>>
	radioTPA: Array<radioTPA>
	setRadioTPa: React.Dispatch<React.SetStateAction<Array<radioTPA>>>
	denaeTPA: Array<denaeTPA>
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<denaeTPA>>>
	pilotEQA: Array<pilotEQA>
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<pilotEQA>>>
	dayDuration: { value: number; validity: boolean }
	setDayDuration: React.Dispatch<React.SetStateAction<{ value: number; validity: boolean }>>
	nightDuration: { value: number; validity: boolean }
	setNightDuration: React.Dispatch<React.SetStateAction<{ value: number; validity: boolean }>>
}
