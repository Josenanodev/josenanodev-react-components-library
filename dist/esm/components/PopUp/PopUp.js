import React, { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./PopUp.css";
const PopUp = ({ open = false, children, closeAction, outBoundClickClosesPopUp, aditionalInlineStyle = {}, aditionalClass, }) => {
    //Refs
    const popUpRef = useRef(null);
    //Hooks
    useOutsideClick(popUpRef, () => {
        if (outBoundClickClosesPopUp) {
            setOpenState(false);
            if (closeAction)
                closeAction();
        }
    });
    //Estados
    const [openState, setOpenState] = useState(open);
    //useState
    return (React.createElement("div", { ref: popUpRef, className: "pop-up" +
            ((closeAction && open) || (!closeAction && openState) ? "" : " pop-up-hidden") +
            (aditionalClass ? " " + aditionalClass : ""), style: aditionalInlineStyle }, children));
};
export default PopUp;
