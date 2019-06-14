import React from 'react'
import { Col } from 'react-bootstrap';

const HomeWelcomePanel = ({username}) => 
    <Col xs={12} className="card mb-3">
        <div className="card-body">
            <h2 className="card-title">Welcome to your Homepage, {username !== undefined ? username : 'Guest User'}!</h2>
            {username !== undefined &&
            <p className="card-text">
                <h6>
                    Below, you will find your activity feeds.
                </h6>
                <h6>
                    If you would like to search for a drink, navigate to the Search
                    page by clicking the above link.
                </h6>
                <h6>
                    To view your personal profile, navigate to the Profile
                    page by clicking the above link.
                </h6>
            </p>
            }
            {username === undefined &&
            <p className="card-text">
                <h6>
                    Below, you will see recent comments. If you login, you can 
                    see comments from the people you follow, and view your most 
                    recent activity.
                </h6>
            </p>
            }
        </div>
    </Col>

export default HomeWelcomePanel