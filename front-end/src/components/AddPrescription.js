import React, { Component } from "react";
import { Form, Button , Card } from 'react-bootstrap';

import axios from 'axios';

class PrescriptionForm extends Component {

    handleSubmit = (event, requestType) => {
        // event.preventDefault();

        const drug_name = event.target.elements.drug_name.value;
        const dosage = event.target.elements.dosage.value;
        const route = event.target.elements.route.value;
        const frequency = event.target.elements.frequency.value;
        const amount_dispensed = event.target.elements.amount_dispensed.value;
        const no_of_refills = event.target.elements.no_of_refills.value;
        const expiration_date = event.target.elements.expiration_date.value;

        console.log(drug_name, dosage, route, frequency, amount_dispensed, no_of_refills, expiration_date);

        switch (requestType) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/api/prescription-view/', {
                    drug_name:drug_name,
                    dosage:dosage,
                    route:route,
                    frequency:frequency,
                    amount_dispensed:amount_dispensed,
                    no_of_refills:no_of_refills,
                    expiration_date:expiration_date
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render(){
        return(

            <Card style={{marginTop: "2rem", fontSize: "11px"}}>
                <Card.Header>Prescription Form</Card.Header>
                <Card.Body>

                <Form onSubmit={(event) => this.handleSubmit(
                    event,
                    this.props.requestType
                )}>
                    <Form.Group>
                        <Form.Label>Medicine Name</Form.Label>
                        <Form.Control type="text" size="sm" name='drug_name'  placeholder="Mediine Name"  />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Dosage</Form.Label>
                        <Form.Control type="number" size="sm" name="dosage" placeholder="Dosage" />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Frequency</Form.Label>
                        <Form.Control type="text" size="sm" name="frequency"  placeholder="Frequency" />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Route</Form.Label>
                        <Form.Control type="text" size="sm" name="route" placeholder="Route" />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Amount Dispense</Form.Label>
                        <Form.Control type="number" size="sm" name="amount_dispensed" placeholder="Amount Dispense" />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>No of Refills</Form.Label>
                        <Form.Control type="number" size="sm" name="no_of_refills"  placeholder="No of Refills" />
                        
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="date" size="sm" name="expiration_date"  placeholder="Expiration Date" />
                        
                    </Form.Group>
                    

                    
                    <Button variant="primary" size="sm" type="submit">
                        Submit
                    </Button>
                </Form>
                    
                </Card.Body>
            </Card>

        
        )
    }
} 

export default PrescriptionForm;