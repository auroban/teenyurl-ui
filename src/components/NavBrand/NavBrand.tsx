import "./NavBrand.css"

import ImageResource from "../../interfaces/resources/ImageResource";

type Props = {
    logoImage: ImageResource,
    logoText: string,
    onClick: () => void,
}

const NavBrand = (props: Props) => {

    return (
        <div className="nav-brand behavior--not-selectable alignment--div--center behavior--pointer-on-hover">
            <div className="nav-brand__image-container behavior--not-selectable">
                <img
                    className="alignment--image--stretched-to-fit" 
                    src={ props.logoImage.path } 
                    alt={ props.logoImage.altText }></img>
            </div>
            <div>
                <label 
                    className="gradient text-overlay behavior--not-selectable behavior--pointer-on-hover"
                    onClick={ props.onClick }
                    >
                        { props.logoText }
                </label>
                <label className="gradient text-shadow">{ props.logoText }</label>
            </div>
        </div>
    );
}

export default NavBrand;