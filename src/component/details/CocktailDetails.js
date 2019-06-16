import React from "react";
import {Badge, Button, Col, Container, Form, Row} from "react-bootstrap";
import {withRouter} from 'react-router'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";

import CocktailDBApiService from "../../services/CocktailDBApiService";
import CocktailService from "../../services/CocktailService";
import UserService from "../../services/UserService";

import './CocktailDetails.scss';
import CommentsPanel from "../CommentsPanel";
import CommentService from "../../services/CommentService";

class CocktailDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.cocktailDBApiService = CocktailDBApiService.getInstance();
        this.cocktailService = CocktailService.getInstance();
        this.userService = UserService.getInstance();
        this.commentService = CommentService.getInstance();

        this.state = {
            drink: {},
            ingredients: [],
            commentActive: false,
            newCommentTitle: '',
            newCommentText: '',
            comments: []
        };
    }

    componentDidMount() {
        this.loadData(this.props.id);
    }

    loadData = (id) => {
        let ourCall = this.cocktailService.findCocktailById(id);
        let externalApiCall = this.cocktailDBApiService.getCocktailDetailsById(id);

        Promise.all([ourCall, externalApiCall]).then(values => {
            this.setState({ drink: values[1].drinks[0] });
            this.collectIngredients();

            if (values[0] === -1) {
                this.cocktailService.createCocktail({
                    id: id,
                    name: this.state.drink.strDrink
                })
            } else {
                this.loadMetaData(values[0])
            }
        })
    };

    loadMetaData = (cocktail) => {
        this.commentService.findCommentsByCocktailId(this.props.id)
        .then(comments => this.setState({
            comments: comments
        }))
        // TODO show likes and comments for this cocktail
    }

    collectIngredients = () => {
        let ingredientArr = [];
        for (let i = 1; i < 15; i++) {
            let ingredient = this.state.drink[`strMeasure${i}`] + " " + this.state.drink[`strIngredient${i}`];
            if (ingredient.length > 2) {
                ingredientArr.push(ingredient);
            }
        }

        this.setState({
            ingredients: ingredientArr
        })
    };

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.loadData(this.props.id);
            this.collectIngredients();
        }
    }

    navigateToLogin = (action) => {
        this.props.history.push({
            pathname: '/login',
            state: { message: `You must log in to leave ${action} on a drink.` }
        });
    };

    changeCommentText = (event) => {
        this.setState({ newCommentText: event.target.value });
    };

    changeCommentTitle = (event) => {
        this.setState({ newCommentTitle: event.target.value });
    };

    createComment = () => {
        console.log('###')
        this.commentService.createComment({
            text: this.state.newCommentText,
            title: this.state.newCommentTitle,
            created: new Date()
        }, this.props.id).then(comment => {
            this.setState(prevState => ({
                comments: prevState.comments.concat([comment]),
                commentActive: false,
                newCommentTitle: '',
                newCommentText: '',
            }))
        });
    };

    render() {
        let { drink } = this.state;

        return (
            <Container fluid>
                <Row>
                    <Col xs={{span: 5, offset: 1}}>
                        <h1 className="my-4">
                            {drink.strDrink}
                            <Button variant="success" className="mr-2 ml-2" onClick={() => {
                                if (this.props.user.id !== undefined) {
                                    this.userService.addLikedCocktail(this.props.id)
                                }
                                else {
                                    this.navigateToLogin("a like");
                                }}}>
                                <FontAwesomeIcon icon="thumbs-up" size="lg"/>
                            </Button>

                        </h1>

                    </Col>
                </Row>

                <div className="row">
                    <Col lg={{span: 5, offset: 1}} md={{span: 10, offset: 1}} className="mb-4">
                        <img src={drink.strDrinkThumb} height={400} width={400} alt=""/>
                    </Col>

                    <Col lg={{span: 5}} md={{span: 10}} className="cocktail-info-scrollable">
                        <h3>
                            <FontAwesomeIcon className="mr-2" icon="info-circle"/>
                            {drink.strCategory}
                        </h3>
                        <h5>
                            Ingredients:
                            <ul>
                                {this.state.ingredients.map((ingr, index) => <li key={index}>{ingr}</li>)}
                            </ul>
                        </h5>
                        <p>
                            Instructions: <i>{drink.strInstructions}</i>
                        </p>
                    </Col>
                </div>
                <Row className="mt-2" >
                    <Col xs={{span: 10, offset: 1}} className="pt-4 pb-4 cocktail-likers">
                        <h4>

                            { this.state.likedBy
                                ?
                                <React.Fragment>
                                <span className="mr-2">
                                    Liked by these users:
                                </span>
                                    { this.state.likedBy.map(user =>
                                        <Badge pill variant="secondary">
                                            {user.firstName + " " + user.lastName}
                                        </Badge>)
                                    }
                                </React.Fragment>
                                :
                                <span>No one has liked this drink yet, be the first!</span>
                            }

                        </h4>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col xs={{span: 12}}>
                        <h4 className="cocktail-discussion-title">
                            <FontAwesomeIcon icon="comments" size="lg" className="mr-2"/>
                            What other users are saying
                        </h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span:10, offset: 1}}>
                        <CommentsPanel title=''
                                       comments={this.state.comments}/>
                    </Col>
                </Row>

                {!this.state.commentActive &&
                <Row className="mt-3">
                    <Col xs={12} className="text-center">
                        <Button onClick={() => {
                            if (this.props.user.id !== undefined) {
                                this.setState({
                                    commentActive: true
                                })
                            } else {
                                this.navigateToLogin("a comment");
                            }
                        }}>
                            <h4 className="mt-2 mb-2">
                                <FontAwesomeIcon icon="comment"
                                                 className="mr-2"
                                />
                                Add a comment
                            </h4>
                        </Button>
                    </Col>
                </Row>
                }
                {this.state.commentActive &&
                <Row>
                    <Col xs={{span: 8, offset: 2}} className="mt-5">
                        <div>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>New Comment</Form.Label>
                                    <Form.Control value={this.state.newCommentTitle}
                                                  onChange={this.changeCommentTitle}
                                                  placeholder="Title"
                                    />
                                    <Form.Control as="textarea"
                                                  rows="3"
                                                  value={this.state.newCommentText}
                                                  onChange={this.changeCommentText}
                                                  placeholder="Comment"
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="danger"
                                            size="lg"
                                            onClick={() =>
                                                this.setState({commentActive: false})}
                                            className="cocktail-info-button mr-2">
                                        <FontAwesomeIcon icon="comment-slash" />
                                    </Button>
                                    <Button variant="success"
                                            size="lg"
                                            className="cocktail-info-button"
                                            onClick={this.createComment}>
                                        <FontAwesomeIcon icon="comment-medical" />
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
                }
            </Container>
        );
    }
}

export default withRouter(CocktailDetails);