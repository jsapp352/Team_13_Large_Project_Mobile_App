import React from 'react'
import {Button, Card, Title,Left, Right,Form,Label, Text, Input, Item, Container, Header, Content, Tab, Tabs } from 'native-base';
import {Modal, ScrollView, StyleSheet} from 'react-native'
import WaitList from './WaitList'
import HelpMenu from './HelpMenu'

export default class TabBar extends React.Component {

	constructor()
	{
		super();
		this.state = {
			courses:['CS1','CS2','OOP','CDA','POOP','C','COT'],
			course_ids: [],
			waitlist:['Kim', 'Tim'],
			current_course_selection: 0,
			user: false,
			student:false,
			TA: false,
			help: false,
			loading: true,
			addStudent: '',
		}
		this.movePage = this.movePage.bind(this);
		this.toggleSignIn = this.toggleSignIn.bind(this);
		this.helpMe = this.helpMe.bind(this);
		this.addStudent = this.addStudent.bind(this);
	}
	
	movePage()
	{
		this.setState({TA:true})
	}

	toggleSignIn()
	{
		console.log(this.state.addStudent)
		this.setState({student:!this.state.student})
	}

	componentWillMount()
	{
		let course_arr = [];
		let course_ids = [];
		let url = 'https://protected-shelf-85013.herokuapp.com/course/'
		fetch(url).then(response => response.json()).then(data => {

			console.log(data);
			for(let i = 0; i < data.length; i++)
			{
				if(data[i].active)
				{	
					let course_title = data[i].courseName;
					let title = course_title.slice(0,3);
					let code = course_title.slice(3);
					let alias = [];
					alias.push(course_title.charAt(0));
					for(let j = 1; j < course_title.length - 1; j++)
					{
						if(course_title.charAt(j) === ' ')
						{
							if(course_title.charAt(j+1) === 'I')
							{
								if(j === course_title.length - 2)
									alias.push('1');
								else if(course_title.charAt(j+2) === 'I')
									alias.push('2');
							}
							else	
								alias.push(course_title.charAt(j+1));
						}
					}
					course_ids.push(data[i].courseId);
					course_arr.push(alias.join("").toUpperCase());
				}	
			}

			this.setState({courses:course_arr, course_ids:course_ids, loading:false});
		});

	
		this.setState({student:false,TA:false,user:false})
	}
	helpMe()
	{
		this.setState({help:true});
	}

	addStudent()
	{
		let list = this.state.waitlist;
		list.push(this.state.addStudent);
		this.setState({waitlist:list});
		this.toggleSignIn();
	}

	render() {
		console.log(this.state.current_course_selection);
		let arr = [];
		for(let i = 0; i < this.state.courses.length; i++)
		{
			arr.push(<Tab  key={i} heading={this.state.courses[i]}></Tab>)
		}
		if(this.state.TA)
		{
			return <WaitList list={this.state.waitlist} />
		}
		if(this.state.help)
		{
			return <HelpMenu />
		}
		return (
			<Container style={styles.container}>
				<Header hasTabs ><Tabs onChangeTab={({i})=>this.setState({current_course_selection:this.state.course_ids[i]})}>{arr}</Tabs></Header>
					<Header style={{justifyContent:'center',alignItems:'center', backgroundColor: "#FFF",marginBottom:10}}><Left style={{justifyContent:'flex-end',textAlign:'right', backgroundColor: "#FFF",marginBottom:10}}><Text>Names</Text></Left><Right style={{justifyContent:'flex-end', backgroundColor: "#FFF",marginBottom:10}}><Text>Estimated Help Time</Text></Right></Header>
					<ScrollView><WaitList courseId={this.state.current_course_selection} list={this.state.waitlist} view='student'/></ScrollView>
					<Button small block primary onPress={this.movePage}style={{marginBottom: 5, marginTop: 18}}>
		            	<Text>TA Access</Text>
		        	</Button>
					<Button small block primary onPress={this.toggleSignIn} style={styles.mb15}>
		            	<Text>Student Sign In</Text>
		        	</Button>
					<Button small block primary onPress={this.helpMe} style={styles.mb15}>
		            	<Text>Need Help?</Text>
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
				              <Input onChangeText={(event)=>(this.setState({addStudent:event}))} />
				            </Item>
				          </Form>
				          <Button block onPress={this.addStudent} style={{ margin: 15, marginTop: 50 }}>
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
