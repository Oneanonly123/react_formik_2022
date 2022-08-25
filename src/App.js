import React from 'react';
import './App.css';
import EnrolmentForm from './components/EnrolmentForm';
import FormikContainer from './components/FormikContainer';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import OldYoutubeForm from './components/OldYoutubeForm';
import {theme, ThemeProvider} from "@chakra-ui/react"
import ChakraInput from './components/ChakraInput';
// import YoutubeForm from './components/YoutubeForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <div className="App">
        <EnrolmentForm />
        {/* <ChakraInput/> */}
        </div> 
    </ThemeProvider>
    
  );
}

export default App;
