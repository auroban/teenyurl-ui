import { useEffect, useState } from "react";


import "./ClosableToast.css";


import ImageResource from "../../interfaces/resources/ImageResource";
import ImageResourceHelper from "../../helpers/ImageResourceHelper";

type Props = {
    className?: string,
    onHide: () => void,
    title: string,
    contents: string[],
    showToast: boolean,
    duration?: number,
}

type State = {
    iconClose?: ImageResource,
    forceStopAnimation: false,
}

export const ClosableToast = (props: Props) => {

    const [state, setState] = useState<State>({ forceStopAnimation : false });

    useEffect(() => { fetchAndUpdate() }, []);

    const fetchAndUpdate = async () => {
        const iconClose = await ImageResourceHelper.getCloseIcon();
        setState(prevState => ({ ...prevState, iconClose : iconClose }))
    }

    const toastClassNames = `closable-toast ${ props.className } 
                            ${ props.showToast ? "closable-toast--show" : "closable-toast--hide"}`;


    const content = props.contents.map((c, i) => {
        return <label key={ `ctc-${ i }` }>{ `${ i + 1 }. ${ c }` }</label>
    });

    return (
        <div className={ toastClassNames }>
            <section className="closable-toast__header">
                <div className="closable-toast__header__title alignment--div--center">
                    { props.title }
                </div>
                <div 
                    className="closable-toast__header__icon alignment--div--center behavior--pointer-on-hover"
                    onClick={ props.onHide }>
                    <img 
                        className="alignment--image--stretched-to-fit"
                        src={ state.iconClose?.path } 
                        alt={ state.iconClose?.altText } />
                </div>
            </section>
            <section className="closable-toast__main">
                { content }         
            </section>
        </div>
    )
}