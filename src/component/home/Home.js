import React from 'react'
import UserService from '../../services/UserService'
import CommentsPanel from '../CommentsPanel';
import {Col, Container, Row} from 'react-bootstrap';
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
        else {
            this.commentService.getFollowingComments(3)
            .then(comments => this.setState({
                followingComments: comments
            }))
            this.commentService.getComments(3)
            .then(comments => this.setState({
                yourComments: comments
            })) 
        }
    }

    // Needed for logged in homepage to populate on instantiation and refresh
    componentDidMount() {
        if (this.props.user.id !== undefined) {
            this.commentService.getFollowingComments(3)
                .then(comments => this.setState({
                    followingComments: comments
                }))
            this.commentService.getComments(3)
                .then(comments => this.setState({
                    yourComments: comments
                }))
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            this.commentService.getFollowingComments(3)
                .then(comments => this.setState({
                    followingComments: comments
                }))
            this.commentService.getComments(3)
                .then(comments => this.setState({
                    yourComments: comments
                }))
        }
    }

    render() {
        return (
            <Container fluid className='demo'>
            <Container fluid className="mt-3 home-main-div">
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
            </Container>
        )
    }
}

export default Home
