import React from 'react'
import UserService from '../../services/UserService'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import HomeNavHeader from '../HomeNavHeader';
import AnonymousCommentsPanel from '../CommentsPanel';
import { Container, Row, Col } from 'react-bootstrap';
import CommentsPanel from '../CommentsPanel';
import HomeWelcomePanel from './HomeWelcomePanel';
import CommentService from '../../services/CommentService';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.userService = UserService.getInstance()
        this.commentService = CommentService.getInstance()
        this.state = {
            recentComments: [],
            followingComments: [],
            yourComments: []
        }
        if (this.props.user.id === undefined) {
            this.commentService.getRecentComments(3)
            .then(comments => this.setState({
                recentComments: comments
            }))
        }
    }

    render() {
        return (
            <Container className="mt-3">
                {/*<HomeNavHeader user={this.props.user}/>*/}
                <Container>
                    <Row>
                        <HomeWelcomePanel username={this.props.user.username}/>
                        {
                            // Below, for any comments panel, make the API call to get the
                            // desired comments, and return a <CommentsPanel/> during the 
                            // .then after the promise.
                        }
                        {this.props.user.id === undefined &&
                        <CommentsPanel title='Recent Comments on our Platform'
                                    comments={this.state.recentComments}/>
                        }
                        {this.props.user.id !== undefined &&
                        <Container>
                            <Row>
                                <Col xs={6}>
                                    <CommentsPanel title='Following'
                                                comments={this.state.followingComments}/>
                                </Col>
                                <Col xs={6}>
                                    <CommentsPanel title='Your Recent Activity'
                                                comments={this.state.yourComments}/>
                                </Col>
                            </Row>
                        </Container>
                        }
                    </Row>
                </Container>
            </Container>
        )
    }
}

export default Home