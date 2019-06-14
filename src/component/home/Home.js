import React from 'react'
import UserService from '../../services/UserService'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HomeNavHeader from './HomeNavHeader';
import AnonymousCommentsPanel from './CommentsPanel';
import { Container, Row, Col } from 'react-bootstrap';
import CommentsPanel from './CommentsPanel';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
    }

    render() {
        return (
            <Container>
                <HomeNavHeader user={this.props.user}/>
                <Container>
                    {
                        // Below, for any comments panel, make the API call to get the
                        // desired comments, and return a <CommentsPanel/> during the 
                        // .then after the promise.
                    }
                    {this.props.user.id === undefined &&
                    <CommentsPanel title='Recent Comments on our Platform'
                                   comments={[1, 2, 3]}/>
                    }
                    {this.props.user.id !== undefined &&
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <CommentsPanel title='Following'
                                            comments={[1, 2, 3]}/>
                            </Col>
                            <Col xs={6}>
                                <CommentsPanel title='Your Recent Activity'
                                            comments={[1, 2, 3]}/>
                            </Col>
                        </Row>
                    </Container>
                    }
                </Container>
            </Container>
        )
    }
}

export default Home