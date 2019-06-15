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
            {date}
        </Card.Subtitle>

        <Card.Text>
            {content}
        </Card.Text>

        {console.log(author)}
        <Card.Link>
            <Link to={`/profile/${author.id}`}>
                {author.username}
            </Link>
        </Card.Link>
        <Card.Link>
            <Link to={`/details/${cocktail.id}`}>
                {cocktail.name}
            </Link>
        </Card.Link>
    </Card.Body>
</Card>

export default Comment