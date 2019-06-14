import React from 'react'
import {Container, Row, Col, Form} from 'react-bootstrap';
import CocktailItem from './CocktailItem';
import CocktailInfoModal from "./CocktailInfoModal";
import Image from "react-bootstrap/Image";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import CocktailDBApiService from '../../services/CocktailDBApiService';
import { Redirect } from 'react-router'

class Search extends React.Component {
    constructor(props) {
        console.log("Constructing search")
        super(props);
        this.cocktailDBApiService = CocktailDBApiService.getInstance()
        
        if (this.props.searchCriteria !== undefined) {
            console.log(this.props.searchCriteria)
            this.state = {
                cocktailSearchText: this.props.searchCriteria,
                shownCocktails: [],
                modalShown: false,
                modalCocktailId: -1,
                rerouteActive: false
            }
            this.searchCocktail()
        }
        else {
            this.state = {
                cocktailSearchText: "",
                shownCocktails: [],
                modalShown: false,
                modalCocktailId: -1,
                rerouteActive: false
            }
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.searchCriteria !== state.searchCriteria) {
    //         return {
    //             cocktailSearchText: props.searchCriteria,
    //             shownCocktails: [],
    //             modalShown: false,
    //             modalCocktailId: -1,
    //             rerouteActive: false
    //         } 
    //     }
    // }
    
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

    rerouteSearch = () => {
        this.setState({
            rerouteActive: true
        })
    }

    searchCocktail = () => {
        this.cocktailDBApiService.searchCocktail(this.state.cocktailSearchText)
        .then(cocktails => this.updateResults(cocktails))
    }

    render() {
        if (this.state.rerouteActive) {
            return (
                <Redirect to={`/search/${this.state.cocktailSearchText}`}/>
            )
        }
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
                                                              <button class="btn btn-success"
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