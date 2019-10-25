import React from 'react';
import { Card, HTMLTable, Checkbox, Alignment } from '@blueprintjs/core';

export class Dependencies extends React.Component {
	public render() {
		return (
			<Card id='dependencies' interactive={false} className='m-2'>
				<HTMLTable bordered={false} interactive={true}>
					<thead>
						<tr>
							<th>Package</th>
							<th>Installed Version</th>
							<th>Remote Version</th>
							<th>Upgrade to remote</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>LLC_BI</td>
							<td>2.9354</td>
							<td>2.9765</td>
							<td>
								<Checkbox alignIndicator={Alignment.CENTER} checked={false} onChange={() => console.log(':)')} />
							</td>
						</tr>
						<tr>
							<td>nFORCE</td>
							<td>1.8234</td>
							<td>1.9456</td>
							<td>
								<Checkbox checked={false} onChange={() => console.log(':)')} />
							</td>
						</tr>
						<tr>
							<td>nDESIGN</td>
							<td>7.532</td>
							<td>7.975</td>
							<td>
								<Checkbox checked={false} onChange={() => console.log(':)')} />
							</td>
						</tr>
					</tbody>
				</ HTMLTable>
			</Card>);
	}
}
