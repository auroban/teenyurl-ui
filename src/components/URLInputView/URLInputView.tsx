import "./URLInputView.css";

import URLValidityView from "../URLValidityView/URLValidityView";
import { useContext, useRef } from "react";
import { URLContext } from "../../contexts/URLContext";

type Props = {
    onGo: () => void
}

const URLInputView = (props: Props) => {

    const context = useContext(URLContext);
    const refInputText = useRef<HTMLInputElement>(null);

    const onTextChange = () => {
        if (refInputText.current) {
            context?.setURL(refInputText.current.value);
        }
    }

    return (    
        <div className="url-input-view">
            <URLValidityView/>
            <div className="url-input-view__input-wrapper">
                <input 
                    className={ `url-input-view__input-textfield ${ context?.showInvalidURLError === true ? "url-input--error" : null }` }
                    ref={ refInputText }
                    type="url" 
                    onChange={ () => onTextChange() }
                    placeholder="your really long URL goes here" />
            </div>
            <div 
                className={ `url-input-view__submit-button-wrapper 
                            behavior--not-selectable
                            ${ context?.showResultView === true ? "submit-wrapper--inactive" : "submit-wrapper--active" }` }
                onClick={ props.onGo }>
                <div 
                    className={ `url-input-view__submit-button 
                                behavior--not-selectable 
                                ${ context?.showResultView === true ? "submit-button--inactive" : "submit-button--active" }` }>
                        GO
                </div>
            </div>
        </div>
    );
}

export default URLInputView;