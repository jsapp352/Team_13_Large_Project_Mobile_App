import React from 'react'
import {Text,TextInput,Button, View} from 'react-native'
import WaitList from './WaitList'

export default class TAPortal extends React.Component
{
	constructor()
	{
		super();
		
		this.state = {
			logged : false,
			pin: 0,
		}
	}

	// Make Fetch request and login using pin
	componentWillMount()
	{

	}

	handleSubmit = () =>
	{
		this.setState({logged:true});
	}
	
	handleChange = (text) =>
	{
		this.setState({pin: text})
	}	

	render()
	{
		if(!this.state.logged)
		{
			return(
				<View style={styles.container}>		
					<Text style={styles.welcome}>Enter Pin: </Text>
					<TextInput onChangeText={this.handleChange} placeholder='pin'></TextInput>
					<Button title="Submit" onPress={this.handleSubmit}></Button>
				</View>
			);
		}
		else
		{
			return(<WaitList status='ta' />);
		}
	}
}

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
}
