import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Post from './Post';


// all available theme props
const theme = {
	background: '#f5f8fb',
	fontFamily: 'Helvetica Neue',
	headerBgColor: '#924A91',
	headerFontColor: '#fff',
	headerFontSize: '15px',
	botBubbleColor: '#924A91',
	botFontColor: '#fff',
	userBubbleColor: '#fff',
	userFontColor: '#4a4a4a',
};

// all available config props
const config = {
	width: "400px",
	height: "500px",
	hideUserAvatar: true,
	placeholder: 'Type your response.',
	headerTitle: "Interested in Chatbot?",
	floating: true
};


class SimpleForm extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<ChatBot
					steps={[
						{
							id: 'welcome',
							message: "Welcome to Chatbot line 1",
							trigger: '1',
						},
						{
							id: '1',
							message: "Welcome to Chatbot line 2",
							trigger: '2',
						},
						{
							id: '2',
							message: "Please provide your phone number to arrange a Free chatbot",
							trigger: 'phone',
						},
						{
							id: 'phone',
							user: true,
							validator: (value) => {
								if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
									return true;
								}
								else {
									return "Please enter a valid phone number.";
								}
							},
							trigger: 'q-name'
						},
						{
							id:'q-name', 
							message:'What is your name?', 
							trigger:'name',
						},
						{
							id:'name', 
							user:true,
							validator: (value) => {
				                if (/^[A-Za-z]+$/.test(value))
				                  {
				                    return true;
				                  }
				                else
				                  {
				                    return'Please input alphabet characters only.';
				                  }
				              },
							trigger:'q-city'
						},
						{
							id:'q-city', 
							message:'Please let us know your City.', 
							trigger:'city',
						},

						{
							id:'city', 
							user:true,
							validator: (value) => {
				                if (/^[A-Za-z]+$/.test(value))
				                  {
				                    return true;
				                  }
				                else
				                  {
				                    return'Please input alphabet characters only.';
				                  }
				            },
							trigger:'q-treatment'
						},
						{
							id:'q-treatment', 
							message:"Which treatment would you be interested in? (give a option to select)", 
							trigger:'treatment'
						},
						{
							id:'treatment', 
							options:[
							{value:'one', label:'one', trigger:'q-submit'},
							{value:'two', label:'two', trigger:'q-submit'},
							{value:'three', label:'three', trigger:'q-submit'},
							{value:'four', label:'four', trigger:'q-submit'},
							{value:'Other', label:'Other', trigger:'q-submit'},
							] 
						},						
						{
							id: 'q-submit',
							message: 'Do you wish to submit?',
							trigger: 'submit'
						},
						{
							id: 'submit',
							options: [
								{ value: 'y', label: 'Yes', trigger: 'end-message' },
								{ value: 'n', label: 'No', trigger: 'no-submit' },
							]
						},
						{
							id: 'no-submit',
							message: 'Your information was not submitted.',
							end: true,
						},
						{
							id: 'end-message',
							component: <Post />,
							asMessage: true,
							end: true,
						},
					]}
					{...config}
				/>
			</ThemeProvider>

		);
	}

}

export default SimpleForm;