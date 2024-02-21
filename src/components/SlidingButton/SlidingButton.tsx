import { CSSProperties } from "react";
import "./SlidingButton.css"

type Props = {
    buttonText: string,
    onClick: () => void,
    className?: string,
}

const SlidingButton = (props: Props) => {
    
    return (
        <div 
            className={ `sliding-button behavior--not-selectable ${ props.className }` }
            onClick={ () => props.onClick() } >
            <label 
                className="sliding-button-text-style behavior--not-selectable">
                    { props.buttonText }
            </label>
        </div>
    );
}

export default SlidingButton;