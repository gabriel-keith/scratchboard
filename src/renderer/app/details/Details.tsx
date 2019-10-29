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
	public render() {
		return (
			<Card
				id='details'
				interactive={false}
				elevation={Elevation.ONE}
				className='mb-4 mx-4 p-2'
			>
				<h3 className='py-2 mb-4 ml-3 text-lg'>Details</h3>
				<div className='flex flex-wrap justify-between ml-3 w-3/4 mb-4'>
					{/* <div className='p-1 w-full lg:mx-1 md:w-full lg:w-5/12'>
						<p>Deployment Status</p>
						<ProgressBar
							animate={false}
							stripes={false}
							value={0.5}
							className='bp3-intent-primary my-2'
						></ProgressBar>
					</div> */}
					<div className='p-1 w-full'>
						<p>Expiration</p>
						<ProgressBar
							animate={false}
							stripes={false}
							value={this.calcExpirationValue()}
							className='bp3-intent-primary my-2'
						></ProgressBar>
						<p>{this.getDaysToExpiration()} Days Left</p>
					</div>
				</div>
				<div className='flex flex-wrap justify-between ml-3 w-full mb-4'>
					<div className='p-1 w-1/3'>
						<p>Username</p>
						<p className='ml-3'>{this.props.scratchOrg.username}</p>
					</div>
					<div className='p-1 w-1/3'>
						<p>Created</p>
						<p className='ml-3'>{new Date(this.props.scratchOrg.createdDate).toISOString().split('T')[0]}</p>
					</div>
					<div className='p-1 w-1/3'>
						<p>Expires</p>
						<p className='ml-3'>{this.props.scratchOrg.expirationDate}</p>
					</div>
				</div>
				<div className='flex flex-wrap justify-between ml-3 w-full mb-4'>
					<div className='p-1 w-1/3'>
						<p>Connected Status</p>
						<p className='ml-3'>{this.props.scratchOrg.connectedStatus}</p>
					</div>
					<div className='p-1 w-1/3'>
						<p>Org Name</p>
						<p className='ml-3'>{this.props.scratchOrg.orgName}</p>
					</div>
					<div className='p-1 w-1/3'>
						<p>Org Id</p>
						<p className='ml-3'>{this.props.scratchOrg.devHubOrgId}</p>
					</div>
				</div>
				<div className='flex flex-wrap justify-between ml-3 w-full mb-4'>
					<div className='p-1 w-1/3'>
						<p>Project Directory</p>
						<p className='ml-3'>{this.props.orgProject ? this.props.orgProject.projectDir : 'No Project Associated'}</p>
					</div>
					<div className='p-1 w-1/3'>
						<p></p>
					</div>
					<div className='p-1 w-1/3'>
						<p></p>
					</div>
				</div>
			</Card>
		);
	}

	private getDaysToExpiration() {
		const expiration = new Date(this.props.scratchOrg.expirationDate);
		const timeLeft = Math.abs(new Date().getTime() - expiration.getTime());
		return Math.ceil(timeLeft / (1000 * 3600 * 24));
	}

	private calcExpirationValue() {
		const created = new Date(this.props.scratchOrg.createdDate);
		const expiration = new Date(this.props.scratchOrg.expirationDate);
		const difference = Math.abs(created.getTime() - expiration.getTime());
		const totalTime = Math.ceil(difference / (1000 * 3600 * 24));
		const timeLeft = this.getDaysToExpiration();

		const remainingPercent = 1-(timeLeft/totalTime);
		return remainingPercent;
	}
}
