import React from 'react'
import UserService from '../../services/UserService'
import {Redirect, withRouter} from 'react-router'
import {Link} from "react-router-dom";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ListGroup from "react-bootstrap/ListGroup";
import BartenderRequest from "./BartenderRequest";
import AdminService from "../../services/AdminService";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.adminService = AdminService.getInstance();
        this.fetchingData = false;
        this.state = {
            requests: [],
        }

        this.adminService.getBartenderRequests().then(requests => this.setState({ requests: requests }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.id !== this.props.user.id) {
            this.fetchingData = true;

            this.adminService.getBartenderRequests().then(requests => this.setState({ requests: requests }))
        }
    }

    verifyBartender = (uid) =>
        this.adminService.verifyBartenderRequest(uid)
            .then(response => this.response.status === 200 ?
                this.setState(prevState => ({ requests: prevState.requests.filter(req => req.id !== uid) }))
                : alert(`Error approving user with id ${uid}`));

    render() {
        if (!this.props.user.isAdmin) {
            return (
                <Redirect to='/'/>
            )
        }

        let { requests } = this.state;

        return (
            <Container className="mt-3">
                <h2>Review the bartender requests</h2>
                {requests.length > 0 &&
                <ListGroup>
                    {requests.map(req => <BartenderRequest {...req} verifyBartender={this.verifyBartender}/>) }
                </ListGroup>
                }
                {requests.length === 0 &&
                <h4>No pending requests, come back later!</h4>
                }
            </Container>
        )
    }
}

export default AdminDashboard;