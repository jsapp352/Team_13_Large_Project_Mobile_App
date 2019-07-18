import React from 'react'
import TabBar from './TabBar'
import {
	Container,
	Header,
	Title,
	Content,
  	Button,
  	Icon,
	Form,
  	List,
 	ListItem,
	Label,
	Text,
	Input,
	Item,
 	Left,
  	Right,
  	Body,
	Subtitle,
	CheckBox,
	View
} from "native-base";

export default class HelpMenu extends React.Component
{
	constructor()
	{
		super();
		this.state = {goBack:false}
	}

	render()
	{
		if(this.state.goBack){return <TabBar />};

		return(
			<View>
			<Text>
				At the top of the page, you will see tabs containing courses 
				which have TA's currently in the cave.
			</Text>	
			<Button onPress={()=>{this.setState({goBack:true})}}>
				<Text>Go Back</Text>
			</Button>
			</View>
		)	
	}
}
