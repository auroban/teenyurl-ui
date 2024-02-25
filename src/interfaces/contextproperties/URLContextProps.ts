import ImageResource from "../resources/ImageResource";
import { URLCreatedResponse } from "../responses/URLCreatedResponse";

export interface URLContextProps {
    listOfDropdownItems: string[],
    defaultIndex?: number,
    durationValue: string,
    setDurationUnit: (index: number) => void,
    setDurationValue: (value: string) => void,
    setURL: (url: string) => void,
    showInvalidDurationUnitError?: boolean,
    showInvalidDurationValueError?: boolean,
    showInvalidURLError?: boolean,
    urlCreatedResponse: URLCreatedResponse | null,
    setURLCreatedResponse: (response: URLCreatedResponse) => void,
    resultViewCloseIcon?: ImageResource,
    copyIcon?: ImageResource,
    showResultView?: boolean,
    clearResult?: () => void,
}