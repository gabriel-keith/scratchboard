import React from 'react';
import { Card, Elevation, ProgressBar } from '@blueprintjs/core';
import { ScratchOrg } from 'common/data/orgs';
import { ProjectConfig } from 'common/data/projects';

interface OwnProps {
	scratchOrg: ScratchOrg;
	orgProject?: ProjectConfig;
}

type Props = OwnProps;

export class Details extends React.Component<Props> {
	private getDaysToExpiration() {
		const { scratchOrg } = this.props;

		const expiration = new Date(scratchOrg.expirationDate);
		const timeLeft = Math.abs(new Date().getTime() - expiration.getTime());
		return Math.ceil(timeLeft / (1000 * 3600 * 24));
	}

	private calcExpirationValue() {
		const { scratchOrg } = this.props;

		const created = new Date(scratchOrg.createdDate);
		const expiration = new Date(scratchOrg.expirationDate);
		const difference = Math.abs(created.getTime() - expiration.getTime());
		const totalTime = Math.ceil(difference / (1000 * 3600 * 24));
		const timeLeft = this.getDaysToExpiration();

		const remainingPercent = 1 - timeLeft / totalTime;
		return remainingPercent;
	}

	public render() {
		const { scratchOrg, orgProject } = this.props;

		return (
			<Card id="details" interactive={false} elevation={Elevation.ONE} className="mb-4 mx-4 p-2">
				<h3 className="py-2 mb-4 ml-3 text-lg font-bold">Details</h3>
				<div className="flex flex-wrap justify-between ml-3 w-3/4 mb-4">
					<div className="p-1 w-full">
						<p className="font-bold">Expiration</p>
						<ProgressBar
							animate={false}
							stripes={false}
							value={this.calcExpirationValue()}
							className="bp3-intent-primary my-2"
						/>
						<p>
							{this.getDaysToExpiration()}
							Days Left
						</p>
					</div>
				</div>
				<div className="flex flex-wrap justify-between ml-3 w-full mb-4">
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Username</p>
						<p>{scratchOrg.username}</p>
					</div>
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Created</p>
						<p>{new Date(scratchOrg.createdDate).toISOString().split('T')[0]}</p>
					</div>
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Expires</p>
						<p>{scratchOrg.expirationDate}</p>
					</div>
				</div>
				<div className="flex flex-wrap justify-between ml-3 w-full mb-4">
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Connected Status</p>
						<p>{scratchOrg.connectedStatus}</p>
					</div>
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Org Name</p>
						<p>{scratchOrg.orgName}</p>
					</div>
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Org Id</p>
						<p>{scratchOrg.devHubOrgId}</p>
					</div>
				</div>
				<div className="flex flex-wrap justify-between ml-3 w-full mb-4">
					<div className="p-1 w-1/3">
						<p className="font-bold pb-1">Project Directory</p>
						<p>{orgProject ? orgProject.projectDir : 'No Project Associated'}</p>
					</div>
					<div className="p-1 w-1/3" />
					<div className="p-1 w-1/3" />
				</div>
			</Card>
		);
	}
}
