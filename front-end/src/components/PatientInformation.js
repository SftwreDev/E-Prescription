import React, { Component, component } from 'react';
import PrescriptionService from "../services/PrescriptionServices";

import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Image , Table} from 'react-bootstrap';

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
                                <Button href="#home" variant="primary" size="sm" style={{borderRadius: "2rem", width: "10rem" }}>
                                    Patient Information
                                </Button>
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
                                <Link to="/prescription-information" className="btn btn-secondary btn-sm" style={{borderRadius: "2rem", width: "10rem" }}>
                                    Prescription
                                </Link>
                            </Col>
                        </Row>
                    
                </Card>

                <Table responsive="sm" style={{marginTop: '1rem'}}>
                    <thead>
                    <tr>
                        
                        <th>General Information</th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        
                        <td>Date of Birth</td>
                        <td>:</td>
                        <td>November 07, 1961</td>
                        
                    </tr>
                    <tr>
                        
                        <td>Age</td>
                        <td>:</td>
                        <td>59</td>
                        
                    </tr>
                    <tr>
                        
                        <td>Sex</td>
                        <td>:</td>
                        <td>Male</td>
                        
                    </tr>
                    <tr>
                        
                        <td>Nationality</td>
                        <td>:</td>
                        <td>Chinese</td>
                        
                    </tr>
                    
                    </tbody>
                </Table>
            </div>
        )
    }
    

}

export default PrescriptionList;