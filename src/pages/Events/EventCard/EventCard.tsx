import React from "react";
import { IEvent } from '../models/event.model';

import "./EventCard.css";

interface EventCardProps {
    eventInfo: IEvent;
    authUserId: string | null;
    onShowDetailHandler: (eventInfo: IEvent) => void;
    onBookEventHandler: (eventId: string) => void
}

const EventCard = ({ eventInfo, authUserId, onShowDetailHandler, onBookEventHandler }: EventCardProps) => {
    const { _id, title, price, creator } = eventInfo;
    return (
        <div className="event-card">
            <div className="event-card__main-info">
                <h3 className="event-info-title">{ title }</h3>
                <h4 className="event-info-price">${ price }</h4>
            </div>
            <div className="event-card__actions">
                <button className="btn btn-primary-outline" onClick={ () => onShowDetailHandler(eventInfo) }>
                    View Details
                </button>
                { creator && creator._id === authUserId ?
                    <p>You the owner of this event.</p> :
                    <button className="btn btn-primary" onClick={ () => onBookEventHandler(_id) }>Book</button>
                }
            </div>
        </div>
    )
}

export default EventCard;
