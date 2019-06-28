/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Picker, StyleSheet, Text,TouchableOpacity,
		TextInput, View, Button} from 'react-native';
import Student from './Student'
import Header from './Header'
import TAPortal from './TAPortal'


//This is placeholder for cross platform debugging in the future

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


// state holds the status of the user. Default is student
// State is set depending on user selections. Proper authentication
// is required for each user type.  User member determines if a user is 
// logged in. Once a selection is made, new component is rendered depending
// on choice
export default class App extends Component {		

	constructor()
	{
		super();
		this.state = {
			user: false,
			student: true,
			ta: false,		
		}
	}
	
	studentLogin = () => 
	{
		this.setState({user:true, student:true,})			
	}
	
	taLogin = () => 
	{
		this.setState({user:true, student:false, ta:true});
	}

	// Picker PlaceHolder should be replaced with API fetch
	render() {
		if(this.state.user === false)
		{
			return(
				<View style={styles.container}>
					<Text style={styles.welcome}>Select Status:</Text>
					<TouchableOpacity onPress={this.studentLogin}><Text style={styles.button}>Student</Text></TouchableOpacity>
					<TouchableOpacity onPress={this.taLogin}><Text style={styles.button}>Assistant</Text></TouchableOpacity>
				</View>
			);
		}
		else
		{
			if(this.state.student)
			{
				return(<Student />)
			}
			else if(this.state.ta)
			{
				return (<TAPortal />)
			}
			else
			{
				alert('woops')
			}
		}
	}
}



// Needs Styling
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
	button: {
	    backgroundColor: 'gray',
   		borderColor: 'white',
	    borderWidth: 1,
	    borderRadius: 12,
	    color: 'white',
	    fontSize: 24,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 12,
		textAlign:'center',
	}
}


// <Picker.Item label="COP3502" value="cs1" />
// 						<Picker.Item label="COP3503" value="cs2" />
// 						<Picker.Item label="COP3330" value="oop" />
// 						<Picker.Item label="CDA3103" value="comporg" />
// 						<Picker.Item label="COP3223" value="intro" />
