/* @flow */

import React, { PropTypes } from 'react';
import Banner from './Banner';

type Props = {
	connectionStatus: 'connecting' | 'online' | 'offline'
}

const BannerOffline = ({ connectionStatus }: Props) => {
	let label;

	switch (connectionStatus) {
	case 'online':
		label = '';
		break;
	case 'offline':
		label = 'Network unavailable. Waiting for connection…';
		break;
	default:
		label = 'Connecting to server…';
	}

	return (
		<Banner
			text={label}
			showClose={false}
		/>
	);
};

BannerOffline.propTypes = {
	connectionStatus: PropTypes.oneOf([ 'connecting', 'offline', 'online' ])
};

export default BannerOffline;