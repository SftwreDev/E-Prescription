import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class NavigationBar extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            {/* <img
                alt=""
                src="/rx.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '} */}
            E-Prescription
            </Navbar.Brand>
        </Navbar>
        )
    }
}


export default NavigationBar;