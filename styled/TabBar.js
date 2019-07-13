import React from 'react'
import {Button, Title,Form,Label, Text, Input, Item, Container, Header, Content, Tab, Tabs } from 'native-base';
import {Modal, ScrollView, StyleSheet} from 'react-native'
import WaitList from './WaitList'

export default class TabBar extends React.Component {

	constructor()
	{
		super();
		this.state = {
			courses:['CS1','CS2','OOP','CDA','POOP','C','COT'],
			current_selection: '',
			user: false,
			student:false,
			TA: false,
		}
		this.movePage = this.movePage.bind(this);
		this.toggleSignIn = this.toggleSignIn.bind(this);
	}
	
	movePage()
	{
		const nav = this.props.navigation;
		nav.navigate('TA')
	}

	toggleSignIn()
	{
		this.setState({student:!this.state.student})
	}

	componentWillMount()
	{
		this.setState({student:false,TA:false,user:false})
	}
	render() {
		
		let arr = [];
		for(let i = 0; i < this.state.courses.length; i++)
		{
			arr.push(<Tab key={i} heading={this.state.courses[i]}></Tab>)
		}

		return (
			<Container style={styles.container}>
				<Header hasTabs ><Tabs>{arr}</Tabs></Header>
					<ScrollView><WaitList view='student'/></ScrollView>
					<Button block primary onPress={this.movePage}style={styles.mb15}>
		            	<Text>TA Access</Text>
		        	</Button>
					<Button block primary onPress={this.toggleSignIn} style={styles.mb15}>
		            	<Text>Student Sign In</Text>
		        	</Button>
					<Modal
						animationType="slide"
				        transparent={false}
				        visible={this.state.student}
						>
						<Content>
				          <Form>
				            <Item floatingLabel>
				              <Label>Enter Name</Label>
				              <Input />
				            </Item>
				          </Form>
				          <Button block onPress={this.toggleSignIn} style={{ margin: 15, marginTop: 50 }}>
				            <Text>Sign In</Text>
				          </Button>
						  <Button block onPress={this.toggleSignIn} style={{ margin: 15, marginTop: 15 }}>
				            <Text>Cancel</Text>
				          </Button>
				        </Content>
					</Modal>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  mb15: {
    marginBottom: 5,
	borderColor: 'black'
  },
});
