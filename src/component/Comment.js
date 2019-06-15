import React from 'react'
import Card from "react-bootstrap/Card";

const Comment = () =>
<Card className="mx-auto">
    <Card.Body>
        <Card.Title>
            I love Margaritas!
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
            Posted on: 5/17/2020
        </Card.Subtitle>

        <Card.Text>
            I really, really love this recipe. Exquisite.
        </Card.Text>

        <Card.Link><a href="#"> TomVCookie </a></Card.Link>
        <Card.Link><a href="#">Margarita</a></Card.Link>
    </Card.Body>
</Card>

export default Comment