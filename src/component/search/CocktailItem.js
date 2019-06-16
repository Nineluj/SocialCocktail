import React from 'react';
import {Button, Card} from 'react-bootstrap';
import './CocktailItem.scss'
import {Link} from "react-router-dom";

const CocktailItem = (props) => (
    <Card className="mb-3 cocktail-card">
        <Card.Img variant="top" src={props.data.strDrinkThumb} />
        <Card.Body className="cocktail-card-body">
            <Card.Title>{props.data.strDrink}</Card.Title>
            <ul>
                <li>Category: {props.data.strCategory}</li>
                <li>Glass Type: {props.data.strGlass}</li>
            </ul>
            <Link className="cocktail-card-link" to={`/details/${props.data.idDrink}`}>
                <Button variant="success">
                    See More
                </Button>
            </Link>
        </Card.Body>
    </Card>
);

export default CocktailItem;