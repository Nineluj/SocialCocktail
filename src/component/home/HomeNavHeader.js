import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap'
import UserService from '../../services/UserService';

let userService = UserService.getInstance()

const HomeNavHeader = ({user}) =>
    <Navbar expand="lg">
        <Navbar.Brand as={Link} to="/">
            <h1>
                Social Cocktail
            </h1>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="mr-auto">
            <NavItem eventkey={1} href="/">
                <Nav.Link as={Link} to="/" ><h4>Home</h4></Nav.Link>
            </NavItem>
            <NavItem eventkey={2} href="/search">
                <Nav.Link as={Link} to="/search" ><h4>Search</h4></Nav.Link>
            </NavItem>
            {user.id !== undefined &&
            <NavItem eventkey={3} href="/profile">
                <Nav.Link as={Link} to="/profile" ><h4>Profile</h4></Nav.Link>
            </NavItem>}
            {user.id === undefined &&
            <NavItem eventkey={4} href="/login">
                <Nav.Link as={Link} to="/login" ><h4>Login</h4></Nav.Link>
            </NavItem>}
            {user.id === undefined &&
            <NavItem eventkey={5} href="/register">
                <Nav.Link as={Link} to="/register" ><h4>Register</h4></Nav.Link>
            </NavItem>}
            {user.id !== undefined &&
            <NavItem eventkey={1} href="/">
                <Nav.Link as={Link} to="/" onClick={() => 
                            userService.logoutUser()
                            .then(response => response.status === 200 ? window.location.reload() : alert('Could not log out.'))} >
                                <h4>Logout</h4>
                </Nav.Link>
            </NavItem>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>

export default HomeNavHeader