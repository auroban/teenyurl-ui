import "./URLInputView.css";
import URLValidityView from "../URLValidityView/URLValidityView";

const URLInputView = () => {

    return (
        <div className="url-input-view">
            <URLValidityView />
            <div className="url-input-view__input-wrapper">
                <input className="url-input-view__input-textfield" type="url" placeholder="your really long URL goes here" />
            </div>
            <div className="url-input-view__submit-button-wrapper behavior--not-selectable">
                <div className="url-input-view__submit-button behavior--not-selectable">
                    <label className="url-input-view__submit-button-text behavior--not-selectable no-margin">GO</label>
                </div>
            </div>
        </div>
    );
}

export default URLInputView;