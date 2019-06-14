import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap'
import UserService from '../../services/UserService';

let userService = UserService.getInstance()

const HomeNavHeader = ({user}) =>
    <Navbar>
        <Navbar.Brand as={Link} to="/" >Social Cocktail</Navbar.Brand>
        <Navbar.Collapse>
            <Nav className="mr-auto">
            <NavItem eventkey={1} href="/">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
            </NavItem>
            <NavItem eventkey={2} href="/search">
                <Nav.Link as={Link} to="/search" >Search</Nav.Link>
            </NavItem>
            {user.id !== undefined &&
            <NavItem eventkey={3} href="/profile">
                <Nav.Link as={Link} to="/profile" >Profile</Nav.Link>
            </NavItem>}
            {user.id === undefined &&
            <NavItem eventkey={4} href="/login">
                <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            </NavItem>}
            {user.id === undefined &&
            <NavItem eventkey={5} href="/register">
                <Nav.Link as={Link} to="/register" >Register</Nav.Link>
            </NavItem>}
            {user.id !== undefined &&
            <NavItem eventkey={1} href="/">
                <Nav.Link as={Link} to="/" onClick={() => 
                            userService.logoutUser()
                            .then(response => response.status === 200 ? window.location.reload() : alert('Could not log out.'))} >Logout</Nav.Link>
            </NavItem>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>

export default HomeNavHeader