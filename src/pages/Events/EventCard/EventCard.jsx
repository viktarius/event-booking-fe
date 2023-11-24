import React from "react";

import "./EventCard.css";

function EventCard({ title }) {
    return (
        <div className="event-card">
            <h4>{title}</h4>
        </div>
    )
}

export default EventCard;
