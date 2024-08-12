import {useSelector} from "react-redux";
import {selectIsTestFinished} from "../../Redux/resultSelectors";
import {TextZone} from "../TextZone/TextZone";
import React from "react";
import {ResultWindow} from "../ResultWindow/ResultWindow";

export const MainPage = () => {
    const isTestFinished = useSelector(selectIsTestFinished)
    return (
        <div>
            {!isTestFinished && <TextZone/>}
            {isTestFinished && <ResultWindow/>}
        </div>
    )
}