import React from 'react'
import Comment from './Comment';

const CommentsPanel = ({title, comments}) =>
    <div>
        <h3>{title}</h3>
        {// Here, hit API endpoint to get most recent
        //  comments, and .map(comment => <Comment/>)
        }
        {comments.map(comment => <Comment title={comment.title}
                                          date={comment.created}
                                          content={comment.text}
                                          author={comment.author}
                                          cocktail={comment.cocktail}/>)}
    </div>

export default CommentsPanel