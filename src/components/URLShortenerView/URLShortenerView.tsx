import "./URLShortenerView.css";
import URLInputView from "../URLInputView/URLInputView";
import ResultView from "../ResultView/ResultView";
import { URLCreatedResponse } from "../../interfaces/responses/URLCreatedResponse";
import { useEffect, useState } from "react";
import { URLContextProps } from "../../interfaces/contextproperties/URLContextProps";
import { URLContext } from "../../contexts/URLContext";

import API from "../../helpers/API";
import ImageResource from "../../interfaces/resources/ImageResource";
import ImageResourceHelper from "../../helpers/ImageResourceHelper";

type Props = {
    className?: string
}

type State = {
    urlCreatedResponse: URLCreatedResponse | null,
    durationUnit: string | null,
    durationValue: string,
    showDurationUnitError: boolean,
    showDurationValueError: boolean,
    resultCloseIcon?: ImageResource,
    copyIcon?: ImageResource,
    showResultView?: boolean,
}

const URLShortenerView = (props: Props) => {

    const dropdownMenu = [ "HOUR", "DAY", "MONTH", "YEAR" ];

    const initState: State = {
        urlCreatedResponse : null,
        durationUnit : null,
        durationValue : "1",
        showDurationUnitError : false,
        showDurationValueError : false,
        showResultView : false,
    }

    const fetchAndUpdate = async () => {
        console.debug("Fetching resources");
        const icClose = await ImageResourceHelper.getCloseIcon();
        const icCopy = await ImageResourceHelper.getCopyIcon();
        setViewState(prevState => ({...prevState, resultCloseIcon : icClose, copyIcon : icCopy}));
    }

    const [viewState, setViewState] = useState<State>(initState);

    const setURLCreatedResponse = (response: URLCreatedResponse) => {
        setViewState(prevState => ({...prevState, urlCreatedResponse: response}));
    };

    const setDurationUnit = (index: number) => {
        setViewState(prevState => ({ ...prevState, durationUnit : dropdownMenu[index] }));
    }

    const setDurationValue = (value: string) => {
        setViewState(prevState => ({...prevState, durationValue : value}));
    }

    const clearResult = () => {
        setViewState(prevState => ({...prevState, showResultView : false}))
    }

    const onGo = async () => {

        if (viewState.showResultView) {
            return;
        }

        if (!viewState.durationUnit) {
            console.warn("No duration unit selected");
            setViewState(prevState => ({ ...prevState, showDurationUnitError : true}))
            return;
        }

        if (!dropdownMenu.includes(viewState.durationUnit)) {
            console.warn("Invalid duration unit selected");
            setViewState(prevState => ({ ...prevState, showDurationUnitError : true}))
            return;
        }

        const num = Number.parseInt(viewState.durationValue);

        if (isNaN(num)) {
            console.warn("Invalid duration value set");
            setViewState(prevState => ({ ...prevState, showDurationValueError : true}))
            return;
        }

        if (!(num >= 1 && num <= 999)) {
            console.warn("Duration value not within permitted range 1 - 999");
            setViewState(prevState => ({ ...prevState, showDurationValueError : true}))
            return;
        }

        console.debug("API Called");
        const urlResponse = await API.sendNewURLRequest();
        console.debug(`Fetched URL Response: ${urlResponse}`);

        setViewState(prevState => ({...prevState, urlCreatedResponse : urlResponse, showResultView : true }));
    }

    const urlContextProps: URLContextProps = {
        listOfDropdownItems : dropdownMenu,
        defaultIndex : 1,
        setDurationUnit : setDurationUnit,
        setDurationValue : setDurationValue,
        showInvalidDurationUnitError : false,
        showInvalidDurationValueError : false,
        urlCreatedResponse : viewState.urlCreatedResponse,
        setURLCreatedResponse : setURLCreatedResponse,
        durationValue : viewState.durationValue,
        resultViewCloseIcon : viewState.resultCloseIcon,
        copyIcon : viewState.copyIcon,
        showResultView : viewState.showResultView,
        clearResult : clearResult,
    }

    useEffect(() => {
        fetchAndUpdate();
    }, [])

    return(
        <div className={ `url-shortener-view ${ props.className }` } >
            <div className="url-shortener-view__content">
                <URLContext.Provider value={ urlContextProps }>
                    <URLInputView onGo={ onGo } />
                    <ResultView />
                </URLContext.Provider>
            </div>
        </div>
    );
}

export default URLShortenerView;