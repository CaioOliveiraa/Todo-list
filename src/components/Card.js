import React from "react";

function card(props) {
    return <div className={props.className ? `${props.className} card`: "card"}>
        {props.children}
    </div>
}

export default card