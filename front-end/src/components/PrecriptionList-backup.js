import React, { Component, component } from 'react';
import PrescriptionService from "../services/PrescriptionServices";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Image , Table, Accordion} from 'react-bootstrap';

import PrescriptionForm from './AddPrescription';

class PrescriptionList extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            prescription: []
        }
        this.addPrescription = this.addPrescription.bind(this);
        this.editPrescription = this.editPrescription.bind(this);
        this.deletePrescription = this.deletePrescription.bind(this);
    }

    deletePrescription(id){
        PrescriptionService.deletePrescription(id).then( res => {
            this.state({prescription: this.state.prescription.filter(prescription => prescription.id !== id)});
        });
    }
    viewPrescription(id){
        this.props.history.push(`/prescription-view/${id}`);
    }
    editPrescription(id){
        this.props.history.push('/url/${id');
    }

    componentDidMount(){
        PrescriptionService.getPrescription().then((res) => {
            this.setState({ prescription: res.data});
        });
    }

    addPrescription(){
        this.props.history.push(`/prescription-view/`);
    }

    
    render(){
        return(
            <div style={{padding: "5rem"}}>
                <Row>
                    <Col xs={2}>
                        
                        <Image src="https://image.cnbcfm.com/api/v1/image/104225995-_95A5004.jpg?v=1540458420" roundedCircle style={{height: "7rem" , width: "7rem"}} />
                    
                    </Col>

                    <Col sm={8}>
                        <p style={{fontSize: "20px" , fontWeight: "5000"}}>Jack Ma</p>
                        <Row>
                            {/* <Col xs={5}> */}
                                <p>Coronary Atherosclerosis</p>
                            {/* </Col> */}
                            {/* <Col>
                                <p className="text-muted"> - Latest Diagnosis</p>
                            </Col> */}
                        </Row>
                        
                        
                    </Col>

                    <Col>
                        <Row>
                            <Col>
                                <Button variant="warning" style={{borderRadius: "5rem" , fontStyle: "1rem"}}>Add New</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
                <Card style={{marginTop: "1rem", borderRadius: "5rem" , backgroundColor: "#f5f5f5", padding: "10px" }}>
                    
                        <Row style={{marginLeft: '20px'}}>
                            <Col>
                                <Link to="/patient-information" className="btn btn-secondary btn-sm" style={{borderRadius: "2rem", width: "10rem" }}>
                                    Patient Information
                                </Link>
                                
                            </Col>

                            <Col>
                                <Button href="#home" variant="secondary" size="sm" style={{borderRadius: "2rem", width: "10rem" }}>
                                    Visits
                                </Button>
                            </Col>

                            <Col>
                                <Button href="#home" variant="secondary" size="sm" style={{borderRadius: "2rem", width: "10rem" }}>
                                    Labs
                                </Button>
                            </Col>

                            <Col>
                                <Button href="#home" variant="primary" size="sm" style={{borderRadius: "2rem", width: "10rem" }}>
                                    Prescriptions
                                </Button>
                            </Col>
                        </Row>
                    
                </Card>

                <Accordion style={{marginTop: "10px"}}>
                    <Card>
                        <Card.Header style={{backgroundColor: "white"}}>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{}}>
                                View Latest Prescription
                                
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {
                                    this.state.prescription.map(
                                        prescription =>
                                        <div >
                                            <Table borderless hover size="sm">
                                            
                                                <tbody>
                                                    <tr key = {prescription.id}>
                                                    
                                                        <td>Medicine Name</td>
                                                        <td>:</td>
                                                        <td>{prescription.drug_name}</td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Dosage</td>
                                                        <td>:</td>
                                                        <td>{prescription.dosage}</td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td>Frequency</td>
                                                        <td>:</td>
                                                        <td>{prescription.frequency}</td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td>Amount Dispensed</td>
                                                        <td>:</td>
                                                        <td>{prescription.amount_dispensed}</td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td>No of Refills</td>
                                                        <td>:</td>
                                                        <td>{prescription.no_of_refills}</td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td>Route</td>
                                                        <td>:</td>
                                                        <td>{prescription.route}</td>
                                                    </tr>

                                                    <tr>
                                                        
                                                        <td>Expiration Date</td>
                                                        <td>:</td>
                                                        <td>{prescription.expiration_date}</td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td>Status</td>
                                                        <td>:</td>
                                                        <td>{prescription.active}</td>
                                                    </tr>
                                                    
                                                </tbody>
                                                </Table>
                                        </div>
                                    )
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    
                </Accordion>

                <PrescriptionForm
                requestType="post"/>
            </div>
        )
    }

}

export default PrescriptionList;