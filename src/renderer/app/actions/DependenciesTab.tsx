import React from 'react';
import { Card, HTMLTable, Checkbox, Alignment, Button } from '@blueprintjs/core';

export class DependenciesTab extends React.Component { 
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
								<div className='flex justify-center'>
									<Checkbox id='LLC_BI' checked={false} onChange={() => console.log(':)')}/>
								</div>
							</td>
						</tr>
						<tr>
							<td>nFORCE</td>
							<td>1.8234</td>
							<td>1.9456</td>
							<td>
								<div className='flex justify-center'>
									<Checkbox id='nFORCE' checked={false} onChange={() => console.log(':)')} />
								</div>
							</td>
						</tr>
						<tr>
							<td>nDESIGN</td>
							<td>7.532</td>
							<td>7.975</td>
							<td>
								<div className='flex justify-center'>
									<Checkbox id='nDESIGN' checked={false} onChange={() => console.log(':)')} />
								</div>
							</td>
						</tr>
					</tbody>
				</ HTMLTable>
				<div className='flex justify-end'>
					<Button
						type='submit'
						text='Upgrade Selected'/>
				</div>
			</Card>);
	}
}