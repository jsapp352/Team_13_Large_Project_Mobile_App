import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class TabBar extends React.Component
{
	constructor()
	{
		super();
		this.state = {
			courses:['CS1','CS2','CDA','OOP'],
			selected_course: '',
		}

		this.selectCourse = this.selectCourse.bind(this);
	}

	selectCourse(event)
	{
		this.setState({selected_course:event})
	}

	// This will populate the current active courses from API fetch
	componentWillMount()
	{
		//fetch
	}

	render()
	{
	
		let arr = [];

		for (let x = 0; x < this.state.courses.length; x++)
		{
			arr.push(<View><TouchableOpacity onPress={()=>this.selectCourse(this.state.courses[x])}><Text style={styles.button}>{this.state.courses[x]}</Text></TouchableOpacity></View>);
		}

		return(
				<View style={styles.instructions}>
					<Text style={{justifyContent:'center'}}>Courses:</Text>
					<View style={{flexDirection:'row'}}>{arr}</View>
				</View>
		);
	}
}

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
		// marginBottom:10,
		// marginLeft: 50,
		// marginRight: 50,
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
