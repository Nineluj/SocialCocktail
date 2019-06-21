import React from 'react';
import Card from 'react-bootstrap/Card';

const Comment = ({
  title,
  date,
  content,
  author,
  cocktail,
  hideCocktailLink,
}) => (
  <Card className="mx-auto comment">
    <div className="comment-info">
      <div>
        <a href={`/profile/${author.id}`}>{author.username}</a>'s comment&nbsp;
        {!hideCocktailLink && (
          <span>
            on:
            <a className="comment-cocktail" href={`/details/${cocktail.id}`}>
              {cocktail.name}
            </a>
          </span>
        )}
      </div>
      <div className="text-muted">{date.slice(0, 10)}</div>
    </div>
    <div className="comment-content">
      <div className="comment-title">{title}</div>
      <div className="comment-body">{content}</div>
    </div>
  </Card>
);

export default Comment;
