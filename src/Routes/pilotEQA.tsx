import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../Datas/datas"
import { Header } from "../Sections/Header"
import { Navbar } from "../Sections/Navbar"
import { buildAllEQAs } from "../tools/buildAllEQAs"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { tokenCheck } from "../tools/user"

export const PilotEQA = (): JSX.Element => {
	const [token, setToken] = useState(true)
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (token) {
			const endDate = new Date(Date.now())
			const lastFourYears = new Date(endDate.getFullYear() - 4, endDate.getMonth(), endDate.getDate())
			const lastYear = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate())
			const lastFourMonths = new Date(endDate.getFullYear(), endDate.getMonth() - 4, endDate.getDate())
			const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate())
			const lastFourYearsFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: lastFourYears,
				endDate: endDate,
			})
			const lastYearFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: lastYear,
				endDate: endDate,
			})
			const lastFourMonthsFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: lastFourMonths,
				endDate: endDate,
			})
			const lastMonthFlights = await postFetchRequest(DB_URL + "flights/debriefedFlightsOfLastFourYears", {
				startDate: lastMonth,
				endDate: endDate,
			})
			const allMembers = await getFetchRequest(DB_URL + "crewMembers")
			const EQAs = buildAllEQAs(
				allMembers,
				lastFourYearsFlights,
				lastYearFlights,
				lastFourMonthsFlights,
				lastMonthFlights
			)
			console.log(EQAs)
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div>
			<Header />
			<Navbar />
			AllEQAs
		</div>
	)
}