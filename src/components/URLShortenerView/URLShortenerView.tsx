import "./URLShortenerView.css";
import URLInputView from "../URLInputPane/URLInputView";
import ResultPane from "../ResultPane/ResultPane";

type Props = {
    className?: string
}

const URLShortenerView = (props: Props) => {

    return(
        <div className={ `url-shortener-view ${ props.className }` } >
            <div className="url-shortener-view__content">
                <URLInputView />
                <ResultPane />
            </div>
        </div>
    );
}

export default URLShortenerView;