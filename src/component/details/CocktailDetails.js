import React from "react";
import {Container, Button, Form, Col, Row } from "react-bootstrap";
import { Redirect } from 'react-router'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index";

import CocktailDBApiService from "../../services/CocktailDBApiService";
import CocktailService from "../../services/CocktailService";
import UserService from "../../services/UserService";

import './CocktailDetails.scss';

class CocktailDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.cocktailDBApiService = CocktailDBApiService.getInstance();
        this.cocktailService = CocktailService.getInstance();
        this.userService = UserService.getInstance();
        this.processClose = this.processClose.bind(this);

        this.state = {
            drink: {},
            ingredients: [],
            commentActive: false,
            needToLogin: false
        };
    }

    componentDidMount() {
        this.loadData(this.props.id);
    }

    loadData = (id) => {
        let ourCall = this.cocktailService.findCocktailById(id);
        let externalApiCall = this.cocktailDBApiService.getCocktailDetailsById(id);

        Promise.all([ourCall, externalApiCall]).then(values => {
            console.log(values);
            this.setState({ drink: values[1].drinks[0] });
            this.collectIngredients();

            if (values[0] === -1) {
                this.cocktailService.createCocktail({
                    id: id,
                    name: this.state.drink.strDrink
                })
            } else {
                console.log('@@@', values)
                this.loadMetaData(values[0])
            }
        })
    };

    loadMetaData = (cocktail) => {
        console.log(cocktail.comments);
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

    processClose = () => {
        this.setState({
            editedValue: ''
        });

        this.props.hideModal();
    };

    render() {
        let { drink } = this.state;

        if (this.state.needToLogin) {
            return (
                <Redirect to='/login'/>
            )
        }

        return (
            <Container fluid>
                <Row>
                    <Col xs={{span: 5, offset: 1}}>
                    <h1 className="my-4">{drink.strDrink}</h1>
                    </Col>
                </Row>

                <div className="row">
                    <Col lg={{span: 5, offset: 1}} md={{span: 10, offset: 1}} >
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

                        <FontAwesomeIcon icon="thumbs-up"
                                         size="2x"
                                         onClick={() => {
                                             if (this.props.user.id !== undefined) {
                                                 this.userService.addLikedCocktail(this.props.id)
                                             }
                                             else {
                                                 this.setState({
                                                     needToLogin: true
                                                 })
                                             }
                                         }}
                        />

                        <FontAwesomeIcon icon="comment"
                                         size="2x"
                                         className="ml-3"
                                         onClick={() => {
                                             if (this.props.user.id !== undefined) {
                                                 this.setState({
                                                     commentActive: true
                                                 })
                                             }
                                             else {
                                                 this.setState({
                                                     needToLogin: true
                                                 })
                                             }
                                         }}
                        />

                        {this.state.commentActive &&
                        <div>
                            <textarea></textarea>
                            <Button variant="success btn-block" className="cocktail-info-button">
                                Submit
                            </Button>
                            <Button variant="danger btn-block"
                                    onClick={() =>
                                        this.setState({commentActive: false})}
                                    className="cocktail-info-button">
                                Cancel Comment
                            </Button>
                        </div>
                        }
                    </Col>
                </div>
                <Row className="mt-5">
                    <Col xs={{span: 12}}>
                        <h4 className="cocktail-discussion-title"><FontAwesomeIcon icon="comments" className="mr-2"/> What other users are saying</h4>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CocktailDetails;