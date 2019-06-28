import React from 'react';
import { View, Text } from 'react-native'
import Temp from './Temp'


const Header = (props) => {
	return (<Text style={props.style}>{props.headerText}</Text>);
}

export default Header;

const style = {

}
