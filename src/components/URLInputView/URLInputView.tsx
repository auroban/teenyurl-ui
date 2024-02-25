import "./URLInputView.css";
import URLValidityView from "../URLValidityView/URLValidityView";
import { useContext } from "react";
import { URLContext } from "../../contexts/URLContext";

type Props = {
    onGo: () => void
}

const URLInputView = (props: Props) => {

    const context = useContext(URLContext);

    return (    
        <div className="url-input-view">
            <URLValidityView/>
            <div className="url-input-view__input-wrapper">
                <input className="url-input-view__input-textfield" type="url" placeholder="your really long URL goes here" />
            </div>
            <div 
                className={ `url-input-view__submit-button-wrapper 
                            behavior--not-selectable
                            ${ context?.showResultView === true ? "submit-wrapper--inactive" : "submit-wrapper--active" }` }>
                <div 
                    className={ `url-input-view__submit-button 
                                behavior--not-selectable 
                                ${ context?.showResultView === true ? "submit-button--inactive" : "submit-button--active" }` }
                    onClick={ props.onGo }>
                        GO
                </div>
            </div>
        </div>
    );
}

export default URLInputView;