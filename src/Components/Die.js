import React from "react";

export default function Die(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#888888"
    }
    return ( 
        <div className={props.className} style={style} onClick={props.holded}>
            {props.value}
        </div>
    )
}