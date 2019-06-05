import React from 'react';
import {Card, Button} from 'react-bootstrap';
import './CocktailItem.scss'

const CocktailItem = (props) => (
    <Card bg="dark" style={{ width: '18rem' }} className="mb-3 cocktail-card">
        <Card.Img variant="top" src={props.data.strDrinkThumb} />
        <Card.Body>
            <Card.Title>{props.data.strDrink}</Card.Title>
                <ul>
                    <li>Category: {props.data.strCategory}</li>
                    <li>Glass Type: {props.data.strGlass}</li>
                </ul>
            <Button variant="primary" onClick={() => props.onSelect(props.data.idDrink)}>See More</Button>
        </Card.Body>
    </Card>
);

export default CocktailItem;