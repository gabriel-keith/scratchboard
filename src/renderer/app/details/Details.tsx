import React from 'react';
import { Card, Elevation, ProgressBar } from "@blueprintjs/core";

export class Details extends React.Component {
    public render() {
        return (
			<Card id="sidebar" interactive={false} elevation={Elevation.ONE} className="m-4 p-2">
				<h3 className="py-2 mb-4 ml-3 text-lg">Details</h3>
				<div className="flex flex-wrap justify-between ml-3 w-3/4 mb-4">
					<div className="p-1">
						<p>Deployment Status</p>
						<ProgressBar animate={false} stripes={false} value={.5}
						className="bp3-intent-primary my-2"></ProgressBar>
					</div>
					<div className="p-1">
						<p>Username</p>
						<p className="ml-3">User</p>
					</div>
					<div className="p-1">
						<p>Password</p>
						<p className="ml-3">*********</p>
					</div>
				</div>
				<div className="flex flex-wrap justify-between ml-3 w-3/4 mb-4">
					<div className="p-1">
						<p>Packages Installed</p>
						<p className="ml-3">Value</p>
					</div>
					<div className="p-1">
						<p>Users</p>
						<p className="ml-3">View List</p>
					</div>
				</div>
				<div className="flex flex-wrap justify-between ml-3 w-3/4 mb-4">
					<div className="p-1">
						<p>Frontdoor URL</p>
						<p className="ml-3">https://www.scratchboard.com/is/awesome.html</p>
					</div>
					<div className="p-1">
						<p>Versions</p>
						<p className="ml-3">2.3456</p>
					</div>
					<div className="p-1">
						<p></p>
						<p className="ml-3"></p>
					</div>
				</div>
			</Card>);
    }
}
