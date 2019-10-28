import React from 'react';
import { Card, Elevation, ProgressBar } from '@blueprintjs/core';
import { ScratchOrg } from 'common/data/orgs';

interface OwnProps {
	scratchOrg: ScratchOrg;
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
					<div className='p-1 w-full lg:mx-1 md:w-full lg:w-5/12'>
						<p>Deployment Status</p>
						<ProgressBar
							animate={false}
							stripes={false}
							value={0.5}
							className='bp3-intent-primary my-2'
						></ProgressBar>
					</div>
					<div className='p-1 w-full lg:mx-1 md:w-full lg:w-5/12'>
						<p>Expiration</p>
						<ProgressBar
							animate={false}
							stripes={false}
							value={this.calcExpirationValue()}
							className='bp3-intent-primary my-2'
						></ProgressBar>
					</div>
				</div>
				<div className='flex flex-wrap justify-between ml-3 w-3/4 mb-4'>
					<div className='p-1'>
						<p>Username</p>
						<p className='ml-3'>{this.props.scratchOrg.username}</p>
					</div>
					<div className='p-1'>
						<p>Created</p>
						<p className='ml-3'>{new Date(this.props.scratchOrg.createdDate).toISOString().split('T')[0]}</p>
					</div>
					<div className='p-1'>
						<p>Expires</p>
						<p className='ml-3'>{this.props.scratchOrg.expirationDate}</p>
					</div>
				</div>
				<div className='flex flex-wrap justify-between ml-3 w-3/4 mb-4'>
					<div className='p-1'>
						<p>Connected Status</p>
						<p className='ml-3'>{this.props.scratchOrg.connectedStatus}</p>
					</div>
					<div className='p-1'>
						<p>Org Name</p>
						<p className='ml-3'>{this.props.scratchOrg.orgName}</p>
					</div>
					<div className='p-1'>
						<p>Users</p>
						<p className='ml-3'>View List</p>
					</div>
				</div>
			</Card>
		);
	}

	private calcExpirationValue() {
		const created = new Date(this.props.scratchOrg.createdDate);
		const expiration = new Date(this.props.scratchOrg.expirationDate);
		const difference = Math.abs(created.getTime() - expiration.getTime());
		const totalTime = Math.ceil(difference / (1000 * 3600 * 24));
		let timeLeft = Math.abs(new Date().getTime() - expiration.getTime());
		timeLeft = Math.ceil(timeLeft / (1000 * 3600 * 24));

		const remainingPercent = timeLeft/totalTime;
		return remainingPercent;
	}
}
