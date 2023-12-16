import React from "react";

import "./EmptyList.css";

const EmptyList = ({ message, children }) => <div className="empty-list">
    <h3 className="headline-3">{message}</h3>
    {children}
</div>

export default EmptyList;
