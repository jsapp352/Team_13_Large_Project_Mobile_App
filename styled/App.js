import React from 'react';
import WaitList from './WaitList'
import TabBar from './TabBar'
import {createStackNavigator, createAppContainer} from 'react-navigation';
// import Student from './Student'
const MainNavigator = createStackNavigator({
	Home: {screen: TabBar},
	TA: {screen: WaitList},
	// Student: {screen: Student},
},{headerMode:'none'})

const App = createAppContainer(MainNavigator);

export default App;
