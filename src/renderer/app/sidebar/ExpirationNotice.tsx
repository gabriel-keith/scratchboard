import React from 'react';

import { Callout } from '@blueprintjs/core';

export interface ExpirationNoticeProps {
	expirationDate: Date;
}

export default class ExpirationNotice extends React.PureComponent<ExpirationNoticeProps, {}> {
	private static formatExpirationDate(expirationDate: Date): string {
		return `${expirationDate.getUTCMonth() + 1}.${expirationDate.getUTCDate()}`;
	}

	public render() {
		const { expirationDate } = this.props;

		return (
			<Callout
				className="py-0 px-2 expiration-notice"
				icon={null}
				intent="warning"
				title={`expires ${ExpirationNotice.formatExpirationDate(expirationDate)}`}
			/>
		);
	}
}
