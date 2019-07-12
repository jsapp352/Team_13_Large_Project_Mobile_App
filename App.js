/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Picker, StyleSheet, Text,TouchableOpacity,
		TextInput,Image, View, Button, Modal, ImageBackground} from 'react-native';
import Student from './Student';
import TAPortal from './TAPortal';
import ImageOverlay from 'react-native-image-overlay';
import WaitList from './WaitList'
import TabNavigator from './TabNavigator'

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
	render(props) {


		console.log(props)
		if(this.state.user === false)
		{
			return(
				<View style={styles.container}>
					<TouchableOpacity onPress={this.taLogin}><Text>TA</Text></TouchableOpacity>
					<TabNavigator />
					<WaitList status='student'/>
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
		}
	}
}

// Needs Styling
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		justifyContent: 'center',
		margin: 30,
		marginBottom: 20,
		color: 'black',
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	button: {
		backgroundColor: 'rgba(32, 32, 32, 0.3)',
   		borderColor: 'rgba(12, 12, 12, 0.2)',
	    borderWidth: 1,
	    borderRadius: 11,
	    color: 'black',
	    fontSize: 24,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 7,
		textAlign:'center',
		alignContent: 'center',
		bottom: 10,
		marginTop:10,
		marginBottom:10,
		marginLeft: 50,
		marginRight: 50,
	},
	overlay:{
		marginTop: 215,
		marginBottom:50,
		marginRight:50,
		marginLeft:50,
		justifyContent:'center',
		borderRadius: 20,
		textAlign:'center',
		backgroundColor:'rgba(255, 255, 255, .9)',
	}
});


// <Picker.Item label="COP3502" value="cs1" />
// 						<Picker.Item label="COP3503" value="cs2" />
// 						<Picker.Item label="COP3330" value="oop" />
// 						<Picker.Item label="CDA3103" value="comporg" />
// 						<Picker.Item label="COP3223" value="intro" />


// <ImageBackground source={require('./img_cave.jpg')} style={{flex:1, width:'100%', height:'100%'}}>
// 						<View style={styles.overlay}>
// 								<Text style={styles.welcome}>Select Status:</Text>
// 								<TouchableOpacity onPress={this.studentLogin}><Text style={styles.button}>Student</Text></TouchableOpacity>
// 								<TouchableOpacity onPress={this.taLogin}><Text style={styles.button}>Assistant</Text></TouchableOpacity>
// 						</View>	
// 					</ImageBackground>
