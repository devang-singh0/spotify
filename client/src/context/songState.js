import { useState } from "react";
import SongContext from "./SongContext";

const SongState = (props) => {
    let [state, setState] = useState("65dea4ec82d7431be105f816");
    let update = (e) => {
        setState(e);
    }
    return (
        <SongContext.Provider value={{state, update}}>
            {props.children}
        </SongContext.Provider>
    )
}
export default SongState