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
import { ClosableToast } from "../ClosableToast/ClosableToast";
import { URLCreationRequest } from "../../interfaces/requests/URLCreationRequest";
import { Spinner } from "../Spinner/Spinner";

type Props = {
    className?: string
}

type State = {
    urlCreatedResponse: URLCreatedResponse | null,
    durationUnit: string | null,
    durationValue: string,
    showDurationUnitError: boolean,
    showDurationValueError: boolean,
    showURLError: boolean,
    resultCloseIcon?: ImageResource,
    copyIcon?: ImageResource,
    showResultView?: boolean,
    url?: string,
    showErrorToast: boolean,
    urlErrors?: string[],
    dataFetching: boolean,
}

const URLShortenerView = (props: Props) => {

    const dropdownMenu = [ "HOUR", "DAY", "MONTH", "YEAR" ];

    const initState: State = {
        urlCreatedResponse : null,
        durationUnit : null,
        durationValue : "1",
        showDurationUnitError : false,
        showDurationValueError : false,
        showURLError : false,
        showResultView : false,
        showErrorToast : false,
        dataFetching : false,
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
        setViewState(prevState => ({ ...prevState, durationUnit : dropdownMenu[index], showDurationUnitError : false }));
    }

    const setDurationValue = (value: string) => {
        setViewState(prevState => ({...prevState, durationValue : value, showDurationValueError : false}));
    }

    const clearResult = () => {
        setViewState(prevState => ({...prevState, showResultView : false}))
    }

    const setURL = (url: string) => {
        setViewState(prevState => ({ ...prevState, url : url, showURLError : false }));
    }

    const onGo = async () => {

        if (viewState.showResultView) {
            return;
        }

        if (!validateInput()) {
            setViewState(prevState => ({...prevState, showErrorToast : true}));
            return;
        }
        
        const req: URLCreationRequest = {
            url : viewState.url!,
            duration : {
                unit : viewState.durationUnit!,
                value : Number.parseInt(viewState.durationValue!),
            }
        };

        setViewState(prevState => ({...prevState, dataFetching : true}));

        const urlResponse = await API.sendNewURLRequest(req);
        console.debug(`Fetched URL Response: ${JSON.stringify(urlResponse)}`);

        setViewState(prevState => ({...prevState, urlCreatedResponse : urlResponse, showResultView : true, dataFetching : false }));
    }

    const validateInput = () : boolean => {

        let durationValueError = false;
        let durationUnitError = false;
        let urlInputError = false;

        const errorMessages: string[] = [];

        if (!viewState.durationUnit || !dropdownMenu.includes(viewState.durationUnit)) {
            const msg = `Invalid Duration Unit: ${ viewState.durationUnit }`;
            console.warn(msg);
            errorMessages.push(msg)
            durationUnitError = true;
        }

        const num = Number.parseInt(viewState.durationValue);

        if (isNaN(num) || !(num >= 1 && num <= 999)) {
            const msg = `Invalid Duration Value: ${ viewState.durationValue }`;
            console.warn(msg);
            errorMessages.push(msg)
            durationValueError = true;
        }

        if (!viewState.url || viewState.url!.trim().length === 0) {
            const msg = `Invalid URL Value: ${ viewState.url }`;
            console.warn(msg);
            errorMessages.push(msg);
            urlInputError = true;
        }
        setViewState(prevState => ({ ...prevState, showDurationUnitError : durationUnitError, showDurationValueError : durationValueError, showURLError : urlInputError, urlErrors : errorMessages }));
        return !(durationUnitError || durationValueError || urlInputError);

    }

    const urlContextProps: URLContextProps = {
        listOfDropdownItems : dropdownMenu,
        defaultIndex : 1,
        showInvalidDurationUnitError : viewState.showDurationUnitError,
        showInvalidDurationValueError : viewState.showDurationValueError,
        showInvalidURLError : viewState.showURLError,
        urlCreatedResponse : viewState.urlCreatedResponse,
        durationValue : viewState.durationValue,
        resultViewCloseIcon : viewState.resultCloseIcon,
        copyIcon : viewState.copyIcon,
        showResultView : viewState.showResultView,
        clearResult : clearResult,
        setDurationUnit : setDurationUnit,
        setDurationValue : setDurationValue,
        setURL : setURL,
        setURLCreatedResponse : setURLCreatedResponse,
    }

    useEffect(() => {
        fetchAndUpdate();
    }, [])

    const onErrorToastClose = () => {
        setViewState(prevState => ({ ...prevState, showErrorToast : false, urlErrors : [] }));
    }

    return(
        <div className={ `url-shortener-view ${ props.className }` } >
            <div className="url-shortener-view__content">
                <URLContext.Provider value={ urlContextProps }>
                    <URLInputView onGo={ onGo } />
                    { viewState.dataFetching ? <Spinner /> : <ResultView />}
                </URLContext.Provider>
            </div>
            <ClosableToast 
                showToast={ viewState.showErrorToast } 
                title="Error" 
                contents={ viewState.urlErrors ?? [] } 
                className="url-shortener-view__toast"
                onHide={ onErrorToastClose } />
        </div>
    );
}

export default URLShortenerView;