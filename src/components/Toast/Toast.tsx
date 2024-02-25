import "./Toast.css";

type Props = {
    text: string,
    show: boolean,
    className?: string
}

export const Toast = (props: Props) => {

    return (
        <div 
            className={ 
                `toast-snippet alignment--div--center behavior--not-selectable 
                ${ props.className } ${ props.show ? "toast-snippet--show" : "toast-snippet--hide" }` }>
                { props.text }
        </div>
    );
}