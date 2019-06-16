import React from 'react'
import {Col, Container, Form, Row} from 'react-bootstrap';
import CocktailItem from './CocktailItem';
import Image from "react-bootstrap/Image";
import {Link} from 'react-router-dom'
import CocktailDBApiService from '../../services/CocktailDBApiService';
import {Redirect} from 'react-router'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.isComponentMounted = true;
        this.cocktailDBApiService = CocktailDBApiService.getInstance()

        if (this.props.searchCriteria !== undefined) {
            this.state = {
                cocktailSearchText: this.props.searchCriteria,
                shownCocktails: [],
                rerouteActive: false,
                isComponentMounted: true
            }
            this.searchCocktail();
        }
        else {
            this.state = {
                cocktailSearchText: "",
                shownCocktails: [],
                rerouteActive: false
            }
        }
    }

    componentWillMount() {
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    updateResults = (results) => {
        this.setState({
            shownCocktails: results.drinks
        })
    };


    searchCocktail = () => {
        this.cocktailDBApiService.searchCocktail(this.state.cocktailSearchText)
            .then(cocktails => this.isComponentMounted && this.updateResults(cocktails))
    };

    render() {
        if (this.state.rerouteActive) {
            return (
                <Redirect to={`/search/${this.state.cocktailSearchText}`}/>
            )
        }
        let { cocktailSearchText, shownCocktails } = this.state;

        return (
            <div className="demo">
                <Container className="demo-main-div">
                    <Row>
                        <Col xs={12}>
                            <Image className="demo-main-image" src={require("./SocialCocktail.svg")}/>
                            <h2 className="demo-main-title">Cocktail Search</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Lookup your favorite cocktail</Form.Label>
                                    <Row>
                                        <Col xs={9}>
                                            <Form.Control type="text"
                                                          placeholder="Margarita"
                                                          value={cocktailSearchText}
                                                          onChange={(event) => this.setState({
                                                              cocktailSearchText: event.target.value
                                                          })}
                                            />
                                        </Col>
                                        <Col xs={3}>
                                            <Link to={`/search/${this.state.cocktailSearchText}`}
                                                  onClick={this.searchCocktail}>
                                                <button className="btn btn-success"
                                                        type="button">
                                                    Search
                                                </button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="demo-results">
                            {shownCocktails !== null && shownCocktails.map(cocktail =>
                                <CocktailItem key={cocktail.idDrink} data={cocktail}/>)}
                            {shownCocktails === null && <h5>Womp Womp. No matches found.</h5>}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Search