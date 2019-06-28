import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';


// class Course to create a list of courses, each with their own TAs and properties
// Will use props to fill in tab display
class Course extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			course_id: 0,
			course_title: 'temp',
			professor: '',
			// ta_list: [], ???????????????
		}
	}	

	
	render()
	{
		
		return(
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>{this.state.course_title}</Text>
			</View>
		);	
	}
}

class CourseList extends React.Component
{
	constructor()
	{
		super();
		this.state = {
			courses:['CS1','CS2','CDA','OOP'],
		}
	}

	// This will fetch all available active courses to display on main menu
	componentWillMount()
	{

	}
	
	// what will this render method will do?
	render()
	{
		return(<Text>List</Text>)
	}
}

// Here we will need to dynamically populate tabs to display only current courses
// in which a TA is present
class TabBar extends React.Component
{
	constructor()
	{
		super();
	}

	// Need to  convert 'barElements' to a usable object for navBar
	render()
	{
		const list = new CourseList();
		const barElements = list.state.courses.map((l) => (
			{[l]: l}
		))
		// const bar = createMaterialTopTabNavigator(barElements)
		
		console.log(barElements);

		


		return(<View><Text>TabBar</Text></View>);
	}

	
	// const TabNavigator = createMaterialTopTabNavigator({});
}

export default TabBar;
