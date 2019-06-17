import React from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import UserService from '../../services/UserService';

let userService = UserService.getInstance();

const UserListPanel = ({title, users, following, loggedInId, getLoggedInFollowing}) =>
    <Card>
        <Card.Body>
            <Card.Title>
                <h3>
                    {title}
                </h3>
            </Card.Title>
            <ul>
                {users.map(user => 
                    <div>
                        <li>
                            <Link to={`/profile/${user.id}`}>
                                <h4>
                                    {user.username}
                                </h4>
                            </Link>
                            {(!following.map(followUser => followUser.id).includes(user.id) &&
                                user.id !== loggedInId) &&
                            <Button onClick={() => userService.addFollowing(user.id)
                                                    .then(following => getLoggedInFollowing())
                                            }>
                                Follow
                            </Button>}
                        </li>
                    </div>
                )}
            </ul>
        </Card.Body>
    </Card>

export default UserListPanel