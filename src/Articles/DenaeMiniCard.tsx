import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { CrewTPACard } from "../BasicComponents/CrewTPACard"
import { INITIAL_CREWMEMBER } from "../Datas/crewMember"
import { memberURL } from "../Datas/datas"
import { getQuadri } from "../tools/colorManager"
import { getFetchRequest } from "../tools/fetch"
import { DenaeMiniCardProps } from "../types/Articles"
import { crewMember } from "../types/Objects"

export const DenaeMiniCard = (props: DenaeMiniCardProps): JSX.Element => {
	const [fullName, sertFullName] = useState<crewMember>(INITIAL_CREWMEMBER)
	useAsyncEffect(async () => {
		const members = await getFetchRequest<crewMember[]>(memberURL)
		if (typeof members !== "string") {
			const member = members.find(({ trigram }) => trigram === props.denae.name)
			if (member) sertFullName(member)
		}
	}, [])
	return (
		<div className='card m-1'>
			<div className='card-body card-body-color py-2'>
				<h5 className='card-title text-center py-0'>{`${fullName.rank} ${fullName.firstName} ${fullName.surName}`}</h5>
				<hr className='m-2'></hr>
				<div className='row'>
					<div className='col-md-6'>
						<CrewTPACard member={props.denae} date={props.date} />
					</div>
					<div className='col-md-6'>
						<h6 className='card-subtitle mb-2 text-muted text-center'>TPA Individuel</h6>
						<div className='row'>
							<div className='col-md-6 text-start'>APP RDR: </div>
							<div
								className={`col-md-6 text-end text-${getQuadri(
									props.denae.TPA.appRDR[0],
									props.date
								)}`}>
								{props.denae.TPA.appRDR[0].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>APP RDR: </div>
							<div
								className={`col-md-6 text-end text-${getQuadri(
									props.denae.TPA.appRDR[1],
									props.date
								)}`}>
								{props.denae.TPA.appRDR[1].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>APP RDR: </div>
							<div
								className={`col-md-6 text-end text-${getQuadri(
									props.denae.TPA.appRDR[2],
									props.date
								)}`}>
								{props.denae.TPA.appRDR[2].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>APP RDR: </div>
							<div
								className={`col-md-6 text-end text-${getQuadri(
									props.denae.TPA.appRDR[3],
									props.date
								)}`}>
								{props.denae.TPA.appRDR[3].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>APP RDR: </div>
							<div
								className={`col-md-6 text-end  text-${getQuadri(
									props.denae.TPA.appRDR[4],
									props.date
								)}`}>
								{props.denae.TPA.appRDR[4].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>APP RDR: </div>
							<div
								className={`col-md-6 text-end text-${getQuadri(
									props.denae.TPA.appRDR[5],
									props.date
								)}`}>
								{props.denae.TPA.appRDR[5].toLocaleDateString()}
							</div>
						</div>
						<div className='row'>
							<div className='col-md-6 text-start'>P GPS : </div>
							<div className={`col-md-6 text-end  text-${getQuadri(props.denae.TPA.PGPS, props.date)}`}>
								{props.denae.TPA.PGPS.toLocaleDateString()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
