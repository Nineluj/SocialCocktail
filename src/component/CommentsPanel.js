import React from 'react'
import Comment from './Comment';

const CommentsPanel = (props) =>
    <div>
        <span>{props.title}</span>
        {props.comments !== undefined &&
         props.comments.map(comment => <Comment title={comment.title}
                                                date={comment.created}
                                                content={comment.text}
                                                author={comment.author}
                                                cocktail={comment.cocktail}
                                                key={comment.id}
                                                hideCocktailLink={props.hideCocktailLink}
        />)}
    </div>;

export default CommentsPanel