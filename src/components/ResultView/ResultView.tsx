import { useContext, useState } from "react";

import "./ResultView.css"

import { URLContext } from "../../contexts/URLContext";
import { Toast } from "../Toast/Toast";

type State = {
    showToast: boolean
}

const ResultView = () => {

    const initState = {
        showToast : false,
    }

    const [state, setState] = useState<State>(initState);

    const ctx = useContext(URLContext);

    const onCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showToast()
    };

    const showToast = () => {
        setState(prevState => ({ ...prevState, showToast : true }));
        setTimeout(hideToast, 4000);
    };

    const hideToast = () => {
        setState(prevState => ({ ...prevState, showToast : false }));
    };


    const statusHeaderClassNames = `result-view__status-header ${ (ctx?.showResultView && ctx?.urlCreatedResponse?.data) ? "status-header__bg--success" : "status-header__bg--error" }`; 


    const statusHeader = (
        <div className={ statusHeaderClassNames }>
            <div className="status-header__text alignment--div--center">
                { (ctx?.showResultView && ctx?.urlCreatedResponse?.data) ? "Success" : "Error" }
            </div>
            <div className="status-header__icon alignment--div--center">
                <div onClick={ ctx?.clearResult }>
                    <img
                        className="alignment--image--stretched-to-fit behavior--pointer-on-hover"
                        src={ ctx?.resultViewCloseIcon?.path }
                        alt={ ctx?.resultViewCloseIcon?.altText } />
                </div>
            </div> 
        </div>
    );

    const statusSuccess = (
        <div className="status--success">
            <section className="status-element__row">
                <div className="row__title">
                    Short URL
                </div>
                <div className="row__content--column-2">
                    <div className="row__inner">
                        <input type="text" className="row-element__input" value={ ctx?.urlCreatedResponse?.data?.shortURL } readOnly/>
                    </div>
                    <div 
                        className="row-element__copy behavior--pointer-on-hover behavior--not-selectable"
                        onClick={ () => onCopy(ctx?.urlCreatedResponse?.data?.shortURL ?? "") }>
                        <img 
                            className="alignment--image--stretched-to-fit"
                            src={ ctx?.copyIcon?.path }
                            alt={ ctx?.copyIcon?.altText } />
                    </div>
                </div>
            </section>

            <section className="status-element__row">
                <div className="row__title">
                    Long URL
                </div>
                <div className="row__content--column-2">
                    <div className="row__inner">
                        <input type="text" className="row-element__input" value={ ctx?.urlCreatedResponse?.data?.originalURL } readOnly/>
                    </div>
                    <div 
                        className="row-element__copy alignment behavior--pointer-on-hover behavior--not-selectable"
                        onClick={ () => onCopy(ctx?.urlCreatedResponse?.data?.originalURL ?? "") }>
                        <img 
                            className="alignment--image--stretched-to-fit"
                            src={ ctx?.copyIcon?.path }
                            alt={ ctx?.copyIcon?.altText } />
                    </div>
                </div>
            </section>

            <section className="status-element__row">
                <div className="row__title">
                    Key
                </div>
                <div className="row__content--column-2">
                    <div className="row__inner">
                        <input type="text" className="row-element__input" value={ ctx?.urlCreatedResponse?.data?.key } readOnly/>
                    </div>
                    <div 
                        className="row-element__copy alignment behavior--pointer-on-hover behavior--not-selectable"
                        onClick={ () => onCopy(ctx?.urlCreatedResponse?.data?.key ?? "") }>
                        <img 
                            className="alignment--image--stretched-to-fit"
                            src={ ctx?.copyIcon?.path }
                            alt={ ctx?.copyIcon?.altText } />
                    </div>
                </div>
            </section>

            <section className="status-element__row">
                <div className="row__title">
                    Expiry
                </div>
                <div className="row__content--column-2">
                    <div className="row__inner">
                        <input type="text" className="row-element__input" value={ ctx?.urlCreatedResponse?.data?.expiry.toLocaleString() } readOnly/>
                    </div>
                </div>
            </section>
        </div>
    );

    const statusError = (
        <div className="status--error">
            <section className="status-element__row">
                <div className="row__title">
                    Error Code
                </div>
                <div className="row__content--column-2">
                    <div className="row__inner">
                        <input type="text" className="row-element__input" value={ ctx?.urlCreatedResponse?.error?.code } readOnly/>
                    </div>
                </div>
            </section>

            <section className="status-element__row">
                <div className="row__title">
                    Error Message
                </div>
                <div className="row__content--column-2">
                    <div className="row__inner">
                        <input type="text" className="row-element__input" value={ ctx?.urlCreatedResponse?.error?.description } readOnly/>
                    </div>
                </div>
            </section>
        </div>
    );

    const statusMain = (
        <div className="result-view__status-main alignment--div--center">
            { ctx?.urlCreatedResponse?.data ? statusSuccess : statusError }
        </div>
    );

    return (
        <div className="result-view alignment--div--center behavior--not-selectable">
            <div className={ ctx?.showResultView === true ? "result-view__content show" : "result-view__content hide" }>
                { ctx?.showResultView === true ? statusHeader : null }
                { ctx?.showResultView === true ? statusMain : null }
            </div>
            <Toast text="Text Copied" className="custom-toast" show={ state.showToast } />
        </div>
    );

}

export default ResultView;