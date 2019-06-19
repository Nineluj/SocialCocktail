import React from "react";
import {Badge, Button, Col, Container, Form, Row, Modal} from "react-bootstrap";
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
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
            comments: [],
            usersLikedBy: [],
            showTipModal: false,
            showGlassInfoModal: false,
            showTipsListModal: false,
            glassType: {},
            tips: [],
            tipText: ''
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
                }, this.state.drink.strGlass)
                .then(cocktail => this.loadMetaData(cocktail))
            } else {
                this.loadMetaData(values[0])
            }
        })
    };

    loadMetaData = (cocktail) => {
        this.setState({
            comments: cocktail.comments,
            usersLikedBy: cocktail.usersLikedBy,
            glassType: cocktail.glassType,
            tips: cocktail.tips
        })
    }

    collectIngredients = () => {
        let ingredientArr = [];
        for (let i = 1; i < 15; i++) {
            if (this.state.drink[`strIngredient${i}`] === null) {
                continue
            }
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
        this.commentService.createComment({
            text: this.state.newCommentText,
            title: this.state.newCommentTitle,
            created: new Date()
        }, this.props.id).then(comment => {
            this.setState(({
                comments: this.state.comments.concat([comment]),
                commentActive: false,
                newCommentTitle: '',
                newCommentText: '',
            }))
        });
    };

    setTipModalVisibility = (visible) => {
        this.setState({
            showTipModal: visible
        })
    }

    setGlassInfoModalVisibility = (visible) => {
        this.setState({
            showGlassInfoModal: visible
        })
    }

    setTipsListModalVisibility = (visible) => {
        this.setState({
            showTipsListModal: visible
        })
    }

    setTipText = (text) => {
        this.setState({
            tipText: text
        })
    }

    render() {
        let { drink } = this.state;

        return (
            <Container fluid className="cocktail-details">
                <Modal show={this.state.showTipModal} onHide={() => this.setTipModalVisibility(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Tip</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Submit a tip below:
                        <input className='form-control'
                               onChange={(event) => this.setTipText(event.target.value)}
                               value={this.state.tipText}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setTipModalVisibility(false)}>
                        Close
                        </Button>
                        <Button variant="success" onClick={() => 
                            {
                                this.cocktailService.addTip(this.props.id, {
                                    text: this.state.tipText
                                })
                                this.setState({
                                    tipText: ''
                                })
                                this.setTipModalVisibility(false)
                            }}>
                        Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showGlassInfoModal} onHide={() => this.setGlassInfoModalVisibility(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.glassType.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {this.state.glassType.description}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setGlassInfoModalVisibility(false)}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showTipsListModal} onHide={() => this.setTipsListModalVisibility(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tips from our Verified Bartenders</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul className="list-group">
                            {this.state.tips.map(tip => 
                            <li className="list-group-item">
                                {tip.text} 
                                <Link to={`/profile/${tip.bartender.id}`}
                                      className="float-right">
                                    {tip.bartender.username}
                                </Link>
                            </li>)}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setTipsListModalVisibility(false)}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Row>
                    <Col xs={{span: 5, offset: 1}}>
                        <h1 className="cocktail-details-title my-4">
                            {drink.strDrink}
                            <Button variant="success" className="mr-2 ml-2" onClick={() => {
                                if (this.props.user.id !== undefined) {
                                    this.cocktailService.likeCocktail(this.props.id)
                                        .then(this.setState(prevState => {
                                            if (prevState.usersLikedBy.findIndex(user => user.id === this.props.user.id) === -1) {
                                                return {usersLikedBy: prevState.usersLikedBy.concat(this.props.user)}
                                            } else {
                                                return prevState;
                                            }}))
                                } else {
                                    this.navigateToLogin("a like");
                                }}}>
                                <FontAwesomeIcon icon="thumbs-up" size="lg"/>
                            </Button>
                            <Button variant='danger' 
                                    className="ml-1"
                                    onClick={() => this.setTipsListModalVisibility(true)}>View Tips From The Pros</Button>
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
                            <div className="float-right">
                                    <Button variant="info" onClick={() => this.setGlassInfoModalVisibility(true)} className="mr-1">
                                        Glass Info
                                    </Button>
                                    {this.props.user.verified && 
                                    <Button variant='success' onClick={() => this.setTipModalVisibility(true)}>Add Tip</Button>
                                    }   
                            </div>
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
<<<<<<< HEAD
=======
                        {//this.props.user.verified &&
                        <button class='btn btn-success' onClick={() => this.setTipModalVisibility(true)}>Add Tip</button>
                        }
>>>>>>> 7b96e88c9a81c8463292981858f8af17e2ac9ebc
                    </Col>
                </div>
                <Row className="mt-2" >
                    <Col xs={{span: 10, offset: 1}} className="pt-4 pb-4 cocktail-likers">
                        <h4>

                            { this.state.usersLikedBy !== undefined && this.state.usersLikedBy.length > 0
                                ?
                                <React.Fragment>
                                <span className="mr-2">
                                    Liked by these users:
                                </span>
                                    { this.state.usersLikedBy.map(user =>
                                        <Link to={`/profile/${user.id}`}>
                                        <Badge pill variant="secondary">
                                            {user.username}
                                        </Badge>
                                        </Link>)
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
                                       hideCocktailLink
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