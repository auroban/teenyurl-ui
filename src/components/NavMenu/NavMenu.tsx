// Library imports
import { useContext, useState } from "react";

// CSS imports
import "./NavMenu.css"

// Component imports
import SlidingButton from "../SlidingButton/SlidingButton";
import HeaderContext from "../../contexts/HeaderContext";
import HeaderContextProps from "../../interfaces/contextproperties/HeaderContextProps";

type Props = {
    namesOfButtons: string[], 
    selectedIndex? : number | undefined
}

const NavMenu = (props : Props) => {

    const contextProp: HeaderContextProps | null = useContext(HeaderContext);

    if (props.selectedIndex && !(props.selectedIndex > 0 && props.selectedIndex < props.namesOfButtons.length)) {
        throw new Error("Selected Index cannot be greater than supplied button names");
    }

    let currentIndex = props.selectedIndex ? props.selectedIndex : 0;
    const translationBy = 100;

    const translations = new Array<number>(props.namesOfButtons.length);

    for (let i = 0; i < translations.length; i++) {
        translations[i] = (i - currentIndex) * translationBy;
    }

    const [translation, setTranslation] = useState(translations[currentIndex]);

    const handleClick = (index: number) => {
        contextProp?.setCurrentViewIndex(index);
        setTranslation(translations[index]);
    }
    
    const slidingButtons = props.namesOfButtons.map((name, index) => {
        return <SlidingButton 
                    key={`sb-${index}`} 
                    buttonText={ name } 
                    onClick={ () => handleClick(index) }
                    className="nav-menu__item" />
    }); 

    const slidingSelection = props.namesOfButtons.map((_, index) => {
        const key = `sp-${index}`;
        if (index === currentIndex) {
            return <span 
                        key={key} 
                        id="selected-tab" 
                        className="nav-menu__item" 
                        style={{transform: `translateX(${translation}%)`}}></span>
        } else {
            return <span 
                        key={key} 
                        className="nav-menu__item" ></span>
        }
    });
    
    return (
        <div className="nav-menu alignment--div--center">
            <div className="nav-menu__items alignment--div--center">
                <div className="nav-menu__items__overlay">
                    {
                        slidingButtons
                    }
                </div>
                <div className="nav-menu__items__underlay">
                    {
                        slidingSelection
                    }
                </div>
            </div>
        </div>
    );

}

export default NavMenu;