import React from 'react';

import { Callout } from '@blueprintjs/core';

export interface ExpirationNoticeProps {
	expirationDate: Date;
}

export class ExpirationNotice extends React.PureComponent<ExpirationNoticeProps, {}> {
	public render() {
		return (
			<Callout className='py-0 px-2 expiration-notice' icon={null} intent='warning' title={`expires ${this.formatExpirationDate(this.props.expirationDate)}`}>
			</Callout>);
	}

	private formatExpirationDate(expirationDate: Date): string {
		return `${expirationDate.getUTCMonth() + 1}.${expirationDate.getUTCDate()}`;
	}
}
