import React from 'react'
import Card from "react-bootstrap/Card";
import {Link} from 'react-router-dom'

const Comment = ({title, date, content, author, cocktail}) =>
<Card className="mx-auto">
    <Card.Body>
        <Card.Title>
            {title}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
            {date.slice(0, 10)}
        </Card.Subtitle>

        <Card.Text>
            {content}
        </Card.Text>

        <Card.Link as={Link} to={`/profile/${author.id}`}>
                {author.username}
        </Card.Link>
        <Card.Link as={Link} to={`/details/${cocktail.id}`}>
                {cocktail.name}
        </Card.Link>
    </Card.Body>
</Card>

export default Comment