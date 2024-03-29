import "./URLValidityView.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useContext, useRef } from "react";
import { URLContext } from "../../contexts/URLContext";


const URLValidityView = () => {

    const contextProps = useContext(URLContext);

    const refTextInput = useRef<HTMLInputElement>(null);

    const onTextChange = () => {
        if (refTextInput.current) {
            contextProps?.setDurationValue(refTextInput.current.value);
        }
    }

    const onUnitSelection = (index: number) => {
        contextProps?.setDurationUnit(index);
    }
  
    return (
        <div className="url-validity-view">
            <div className="grid-center">
                <label className="label-text behavior--not-selectable">Valid For</label>
            </div>
            <div className="alignment--div--center">
                <input 
                    type="text"
                    value={ contextProps?.durationValue }
                    ref={ refTextInput }
                    onChange={ () => onTextChange() } 
                    className={ `url-validity-view__duration-textfield ${ contextProps?.showInvalidDurationValueError === true ? "input--error" : "input--no-error" } label-text` }/>
            </div>
            <div className="grid-center">
                    <DropdownMenu 
                        className="url-validity-view__dropdown" 
                        header="Duration" 
                        items={ contextProps?.listOfDropdownItems ?? [] } 
                        onClick={ onUnitSelection }
                        highlightError={ contextProps?.showInvalidDurationUnitError ?? false } />
            </div>
        </div>
    );
}

export default URLValidityView;