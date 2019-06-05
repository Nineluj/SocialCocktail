import React from 'react';
import './App.scss';
import {Container, Row, Col, Form} from 'react-bootstrap';
import CocktailItem from './CocktailItem';
import CocktailInfoModal from "./CocktailInfoModal";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cocktailSearchText: "",
            shownCocktails: [],
            modalShown: false,
            modalCocktailId: -1
        }
    }

    updateResults = (results) => {
        results.then(
            objs => this.setState({
                shownCocktails: objs.drinks
            })

        );

        console.log(this.state)
    };

    updateSearch = (event) => {
        let search = event.target.value;

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(response => this.updateResults(response.json()));

        this.setState({
            cocktailSearchText: event.target.value
        })
    };

    showInformation = (id) => {
        this.setState({
            modalShown: true,
            modalCocktailId: id
        });
    };

    hideModal = () => {
        this.setState({
            modalShown: false,
            modalCocktailId: -1
        });
    };


    render() {
        let { cocktailSearchText, shownCocktails, modalShown } = this.state;

        return (
            <div className="demo">
                { modalShown && <CocktailInfoModal hideModal={this.hideModal} id={this.state.modalCocktailId}/> }
                <Container className="demo-main-div">
                    <Row>
                        <Col xs={12}>
                            <h2 className="demo-main-title">SocialCocktail DEMO</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Lookup your favorite cocktail</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Margarita"
                                                  value={cocktailSearchText}
                                                  onChange={this.updateSearch}
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="demo-results">
                            {shownCocktails !== null && shownCocktails.map(cocktail =>
                                <CocktailItem onSelect={this.showInformation} key={cocktail.idDrink} data={cocktail}/>)}
                            {shownCocktails === null && <h5>Womp Womp. No matches found.</h5>}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
