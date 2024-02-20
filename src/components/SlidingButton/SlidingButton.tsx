import "./SlidingButton.css"

type Props = {
    buttonText: string,
    onClick: () => void,
}

const SlidingButton = (props: Props) => {
    
    return (
        <div 
            className="sliding-button behavior--not-selectable" 
            onClick={ () => props.onClick() }>
            <label 
                className="sliding-button-text-style behavior--not-selectable">
                    { props.buttonText }
            </label>
        </div>
    );
}

export default SlidingButton;