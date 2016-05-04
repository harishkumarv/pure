/* @flow */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import shallowEqual from 'shallowequal';

const {
	Text,
} = ReactNative;

type Props = {
	style?: any;
}

export default class Icon extends Component<void, Props, void> {
	static propTypes = {
		style: Text.propTypes.style,
	};

	shouldComponentUpdate(nextProps: Props): boolean {
		return !shallowEqual(this.props, nextProps);
	}

	setNativeProps(nativeProps: Props) {
		this._root.setNativeProps(nativeProps);
	}

	_root: Object;

	render() {
		return (
			<MaterialIcons
				ref={c => (this._root = c)}
				allowFontScaling={false}
				{...this.props}
			/>
		);
	}
}
