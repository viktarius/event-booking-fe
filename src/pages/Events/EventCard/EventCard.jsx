import React from "react";

import "./EventCard.css";

function EventCard({ title, price, creator, authUserId }) {
    return (
        <div className="event-card">
            <div className="event-card__main-info">
                <h3 className="event-info-title">{title}</h3>
                <h4 className="event-info-price">${price}</h4>
            </div>
            <div className="event-card__actions">
                <button className="btn btn-primary-outline">View Details</button>
                {creator && creator._id === authUserId ?
                    <p>You the owner of this event.</p> :
                    <button className="btn btn-primary">Book</button>
                }
            </div>
        </div>
    )
}

export default EventCard;
