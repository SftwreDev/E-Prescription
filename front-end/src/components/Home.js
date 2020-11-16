import React, { Component, component } from 'react';
import PrescriptionService from "../services/PrescriptionServices";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, CardGroup, Form, Badge , Table, Accordion, Modal, FormControl} from 'react-bootstrap';
import { faPen, faSearch,faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrescriptionForm from './AddPrescription';

class Home extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            prescription: []
        }
        // this.addPrescription = this.addPrescription.bind(this);
        // this.editPrescription = this.editPrescription.bind(this);
        // this.deletePrescription = this.deletePrescription.bind(this);

        this.isActive = this.isActive.bind(this);
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

    isActive(){
        this.setState(this.state.prescription.active = true)
    }
    
    render(){
        return(
            <div style={{padding: "2rem"}}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <Card>
                    <div style={{backgroundColor: "#1e88e5" , color: "white", padding: "8px"}}>Patient Information</div>
                    {/* <Card.Body>
                        <Row>
                            <Col sm md lg="7">
                                <Card.Title>Jack Ma</Card.Title>
                                <Card.Text>
                                <CardGroup>
                                    <Card  style={{ backgroundColor: "#eeeeee " }}>
                                        
                                        <div style={{padding: "10px"}}>
                                            <Card.Title style={{fontSize: "13px"}}>Age</Card.Title>
                                            <Card.Text style={{fontSize: "12px"}}>
                                                55 yrs. old
                                            </Card.Text>
                                        </div>
                                        
                                    </Card>
                                    <Card  style={{ backgroundColor: "#eeeeee " }}>
                                        
                                        <div style={{padding: "10px"}}>
                                            <Card.Title style={{fontSize: "13px"}}>Birthday</Card.Title>
                                            <Card.Text style={{fontSize: "12px"}}>
                                                July 28, 1960
                                            </Card.Text>
                                        </div>
                                        
                                    </Card>
                                    <Card  style={{ backgroundColor: "#eeeeee " }}>
                                        
                                        <div style={{padding: "10px" }}>
                                            <Card.Title style={{fontSize: "13px"}}>Address</Card.Title>
                                            <Card.Text style={{fontSize: "12px"}}>
                                                Beijing, China
                                            </Card.Text>
                                        </div>
                                        
                                    </Card>
                                    <Card  style={{ backgroundColor: "#eeeeee " }}>
                                        
                                        <div style={{padding: "10px" }}>
                                            <Card.Title style={{fontSize: "13px"}}>Contact No</Card.Title>
                                            <Card.Text style={{fontSize: "12px"}}>
                                                +69845522152
                                            </Card.Text>
                                        </div>
                                        
                                    </Card>
                                    <Card  style={{ backgroundColor: "#eeeeee " }}>
                                        
                                        <div style={{padding: "10px" }}>
                                            <Card.Title style={{fontSize: "13px"}}>Email</Card.Title>
                                            <Card.Text style={{fontSize: "12px"}}>
                                                jack-ma@email.com
                                            </Card.Text>
                                        </div>
                                        
                                    </Card>
                                </CardGroup>
                                <hr/>
                                <div style={{display: "inline"}}>
                                <Button variant="primary" size="sm" href="#None" style={{fontSize: "11px"}}>
                                <FontAwesomeIcon icon={faSearch} /> {''}
                                    Check another patient
                                </Button>{' '}
                                <Button variant="warning" size="sm" href="#None" className="text-white" style={{fontSize: "11px"}}>
                                <FontAwesomeIcon icon={faPen} /> {''}
                                    Edit Patient's Info
                                </Button>{' '}
                                </div>
                                </Card.Text>
                            </Col>

                            <Col sm md lg="5">
                            <Card>
                                
                                <div style={{padding: "1rem"}}>
                                <div>Notes</div>
                                    <Form.Control as="textarea" rows={3} />
                                    <hr/>
                                <Button variant="primary" size="sm" type="submit" className="text-white" style={{fontSize: "11px"}}>
                                        Submit
                                    </Button>
                                </div>
                            </Card>

                            </Col>
                        </Row>
                        
                    
                    </Card.Body> */}
                </Card>

                <Card style={{marginTop: "1rem"}}>
                    <div style={{backgroundColor: "#1e88e5" , color: "white", padding: "8px"}}>Prescription Information</div>
                    {/* <Card.Body>
                        
                        <Card.Title>Active Medication</Card.Title>
                        <Table striped bordered hover size="sm" className="text-center" style={{fontSize: "12px"}}> 
                            
                                <tr>
                                
                                <th>Medicine Name</th>
                                <th>Dosage</th>
                                <th>Frequency</th>
                                <th>Route Taken</th>
                                <th>Amount Dispensed</th>
                                <th>No of Refills</th>
                                <th>Date Created</th>
                                <th>Expiration Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                                </tr>
                            
                            <tbody>
                            {
                                this.state.prescription.map(
                                    prescription =>
                                    <tr>
                                    
                                    <th>{prescription.drug_name}</th>
                                    <td>{prescription.dosage}</td>
                                    <td>{prescription.frequency}</td>
                                    <td>{prescription.route}</td>
                                    <td>{prescription.amount_dispensed}</td>
                                    <td>{prescription.no_of_refills}</td>
                                    <td>{prescription.date_created.toString()}</td>
                                    <td>{prescription.expiration_date}</td>
                                    <td><Badge variant="primary">Active</Badge></td>
                                    <td>
                                        <div style={{display: "inline"}}>
                                            <Button variant="primary" size="sm" href="#None" style={{fontSize: "11px"}}>
                                            <FontAwesomeIcon icon={faPen} /> {''}
                                                
                                            </Button>{' '}
                                            <Button variant="danger" size="sm" onClick={this.isActive} className="text-white" style={{fontSize: "11px"}}>
                                            <FontAwesomeIcon icon={faTrashAlt} /> {''}
                                                
                                            </Button>{' '}
                                        </div>
                                    </td>
                                    </tr>
                                )
                            }
                                
                            </tbody>
                            
                        </Table>
                        <hr/>
                        
                        <Accordion style={{marginTop: "10px"}}>
                            <Accordion.Toggle as={Button} variant="danger" size="sm" eventKey="0" style={{fontSize: "11px"}}>
                            <FontAwesomeIcon icon={faPlus} /> {''}
                                Add New Prescription
                                    
                            </Accordion.Toggle> {''}
                            <Accordion.Toggle as={Button} variant="warning" size="sm" eventKey="1" style={{fontSize: "11px", color: "white"}}>
                            <FontAwesomeIcon icon={faPlus} /> {''}
                                View Prescription History
                                    
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                
                                <PrescriptionForm
                                requestType="post"/>
                                
                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="1">
                                
                            <Table striped bordered hover size="sm" className="text-center mt-5" style={{fontSize: "12px"}}> 
                            
                            <tr>
                            
                            <th>Medicine Name</th>
                            <th>Dosage</th>
                            <th>Frequency</th>
                            <th>Route Taken</th>
                            <th>Amount Dispensed</th>
                            <th>No of Refills</th>
                            <th>Date Created</th>
                            <th>Expiration Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                            </tr>
                        
                            <tbody>
                            {
                                this.state.prescription.map(
                                    prescription =>
                                    <tr>
                                    
                                    <th>{prescription.drug_name}</th>
                                    <td>{prescription.dosage}</td>
                                    <td>{prescription.frequency}</td>
                                    <td>{prescription.route}</td>
                                    <td>{prescription.amount_dispensed}</td>
                                    <td>{prescription.no_of_refills}</td>
                                    <td>{prescription.date_created.toString()}</td>
                                    <td>{prescription.expiration_date}</td>
                                    <td><Badge variant="danger">Not Active</Badge></td>
                                    <td>
                                        <div style={{display: "inline"}}>
                                            <Button variant="primary" size="sm" href="#None" style={{fontSize: "11px"}}>
                                            <FontAwesomeIcon icon={faPen} /> {''}
                                                
                                            </Button>{' '}
                                            <Button variant="danger" size="sm" onClick={this.isActive} className="text-white" style={{fontSize: "11px"}}>
                                            <FontAwesomeIcon icon={faTrashAlt} /> {''}
                                                
                                            </Button>{' '}
                                        </div>
                                    </td>
                                    </tr>
                                )
                            }
                                
                            </tbody>
                        
                    </Table>
                                
                            </Accordion.Collapse>
                        </Accordion>
                    </Card.Body> */}
                </Card>
            </div>
        )
    }

}

export default Home;


