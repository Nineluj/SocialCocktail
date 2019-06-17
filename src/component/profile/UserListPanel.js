import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const UserListPanel = ({title, users}) =>
    <Card>
        <Card.Body>
            <Card.Title>
                <h3>
                    {title}
                </h3>
            </Card.Title>
            <ul>
                {users.map(user => <li><Link to={`/profile/${user.id}`}><h4>{user.username}</h4></Link></li>)}
            </ul>
        </Card.Body>
    </Card>

export default UserListPanel