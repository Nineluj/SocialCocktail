import React from 'react'
import UserService from '../../services/UserService'
import {Redirect, withRouter} from 'react-router'
import {Link} from "react-router-dom";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.user.username !== undefined) {
            return (
                <Redirect to='/'/>
            )
        }
        return (
            <Container className="mt-3">
                Admin
            </Container>
        )
    }
}

export default AdminDashboard;