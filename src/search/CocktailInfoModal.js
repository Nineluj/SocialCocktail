import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './CocktailInfoModal.scss';
import CocktailDBApiService from "../services/CocktailDBApiService";

class CocktailInfoModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.cocktailDBApiService = CocktailDBApiService.getInstance()
        this.processClose = this.processClose.bind(this);

        this.state = {
            drink: {},
            ingredients: []
        };
    }

    componentDidMount() {
        this.loadData(this.props.id);
    }

    loadData = (id) => {
        this.cocktailDBApiService.getCocktailDetailsById(id)
        .then(data => {
                this.setState({ drink: data.drinks[0] });
                this.collectIngredients();
            });
    };

    collectIngredients = () => {
        let ingredientArr = [];
        for (let i = 1; i < 15; i++) {
            let ingredient = this.state.drink[`strIngredient${i}`];
            if (ingredient !== "") {
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

        return (
            <Modal show={true} onHide={this.processClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Name: {drink.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Category: <i>{drink.strCategory}</i> <br/>
                    Ingredients:
                    <ul>
                        {this.state.ingredients.map(ingr => <li>{ingr}</li>)}
                    </ul>
                    Instructions: <i>{drink.strInstructions}</i>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.processClose} className="cocktail-info-button">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CocktailInfoModal;