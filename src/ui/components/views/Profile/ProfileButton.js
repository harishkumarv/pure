/* @flow */

import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import AppbarTouchable from '../AppbarTouchable';
import AvatarRound from '../AvatarRound';
import NavigationActions from '../../../navigation-rfc/Navigation/NavigationActions';
import Colors from '../../../Colors';

const {
	StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
	avatar: {
		borderColor: Colors.white,
		borderWidth: 1,
		margin: 13,
	},
});

type Props = {
	user: string;
	onNavigation: Function;
}

export default class ProfileButton extends Component<void, Props, void> {
	static propTypes = {
		user: PropTypes.string.isRequired,
		onNavigation: PropTypes.func.isRequired,
	};

	_handlePress: Function = () => {
		this.props.onNavigation(new NavigationActions.Push({
			name: 'profile',
			props: {
				user: this.props.user,
			},
		}));
	};

	render() {
		return (
			<AppbarTouchable onPress={this._handlePress}>
				<AvatarRound
					user={this.props.user}
					style={styles.avatar}
					size={30}
				/>
			</AppbarTouchable>
		);
	}
}
