import "./DocumentationView.css"

type Props = {
    className?: string
}

const DocumentationView = (props: Props) => {

    return (
        <div className={ `documentation-view ${ props.className }` }>
            
        </div>
    );
}

export default DocumentationView;