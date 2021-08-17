import { crewTPA, denaeTPA, mecboTPA, pilotEQA, pilotTPA, radioTPA } from "./Objects"

export type pilotTPAProps = {
	pilotTPA: pilotTPA
	pilotTPAs: Array<pilotTPA>
	setPilotTPA: React.Dispatch<React.SetStateAction<Array<pilotTPA>>>
	index: number
}
export type crewTPAProps = {
	crewTPA: crewTPA
	setCrewTPA: React.Dispatch<React.SetStateAction<crewTPA>>
}
export type mecboTPAProps = {
	mecboTPA: mecboTPA
	mecboTPAs: Array<mecboTPA>
	setMecboTPA: React.Dispatch<React.SetStateAction<Array<mecboTPA>>>
	index: number
}
export type radioTPAProps = {
	radioTPA: radioTPA
	radioTPAs: Array<radioTPA>
	setRadioTPa: React.Dispatch<React.SetStateAction<Array<radioTPA>>>
	index: number
}
export type denaeTPAProps = {
	denaeTPA: denaeTPA
	denaeTPAs: Array<denaeTPA>
	setDenaeTPA: React.Dispatch<React.SetStateAction<Array<denaeTPA>>>
	index: number
}
export type pilotEQAProps = {
	pilotEQA: pilotEQA
	pilotEQAs: Array<pilotEQA>
	setPilotEQA: React.Dispatch<React.SetStateAction<Array<pilotEQA>>>
	index: number
	dayDuration: { value: number; validity: boolean }
	setDayDuration: React.Dispatch<React.SetStateAction<{ value: number; validity: boolean }>>
	nightDuration: { value: number; validity: boolean }
	setNightDuration: React.Dispatch<React.SetStateAction<{ value: number; validity: boolean }>>
}
