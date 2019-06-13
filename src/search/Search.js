import React from 'react'
import {Container, Row, Col, Form} from 'react-bootstrap';
import CocktailItem from './CocktailItem';
import CocktailInfoModal from "./CocktailInfoModal";
import Image from "react-bootstrap/Image";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CocktailDBApiService from '../services/CocktailDBApiService';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.cocktailDBApiService = CocktailDBApiService.getInstance()
    
        this.state = {
            cocktailSearchText: "",
            shownCocktails: [],
            modalShown: false,
            modalCocktailId: -1
        }
    }
    
    updateResults = (results) => {
        this.setState({
            shownCocktails: results.drinks
        })
    };
    
    updateSearch = (event) => {
        let search = event.target.value;
    
        this.cocktailDBApiService.searchCocktail(search)
        .then(cocktails => this.updateResults(cocktails))
    
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
                        { modalShown && <CocktailInfoModal hideModal={this.hideModal} id={this.state.modalCocktailId} user={this.props.user}/> }
                        <Container className="demo-main-div">
                            <Row>
                                <Col xs={12}>

                                    <Image className="demo-main-image" src={require("./SocialCocktail.svg")}/>
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
                                    {console.log(shownCocktails)}
                                    {shownCocktails !== null && shownCocktails.map(cocktail =>
                                        <CocktailItem onSelect={this.showInformation} key={cocktail.idDrink} data={cocktail}/>)}
                                    {shownCocktails === null && <h5>Womp Womp. No matches found.</h5>}
                                </Col>
                            </Row>
                        </Container>
                    </div>
        )
    }
}

export default Search