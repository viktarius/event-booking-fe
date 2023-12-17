import React from "react";

import "./EmptyList.css";

interface EmptyListProps {
    message: string;
    children?: any;
}

const EmptyList = ({ message, children }: EmptyListProps) => <div className="empty-list">
    <h3 className="headline-3">{ message }</h3>
    { children }
</div>

export default EmptyList;
