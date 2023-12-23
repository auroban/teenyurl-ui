// Library imports
import React, { useState } from "react";
import _ from "lodash";

// CSS imports
import "./HeaderMenu.css"

// Component imports
import SlidingButton from "../SlidingButton/SlidingButton";

const HeaderMenu = (props : {namesOfButtons: string[], selectedIndex? : number | undefined}) => {

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
        console.log("Call coming here: ", index);
        let translation : number;
        if (currentIndex < index) {
            translation = index * translationBy;
        } else {
            translation = index * translationBy;
        }
        setTranslation(translations[index]);
    }

    
    const slidingButtons = _.map(props.namesOfButtons, (val : string, index : number) => {
        return <SlidingButton key={`sb-${index}`} buttonText={val} onClick={() => handleClick(index)} />
    });

    const slidingSelection = _.map(props.namesOfButtons, (val : string, index : number) => {
        const key = `sp-${index}`
        if (index === currentIndex) {
            return <span key={key} id="selected-tab" className="selection-highlighter" style={{transform: `translateX(${translation}%)`}}></span>
        } else {
            return <span key={key} className="selection-highlighter"></span>
        }
    });
    
    return (
        <div className="container-fluid no-padding header-menu">
            <div className="container no-padding menu-box">
                <div className="container no-padding menu-overlay">
                    {
                        slidingButtons
                    }
                </div>
                <div className="container no-padding menu-underlay">
                    {
                        slidingSelection
                    }
                </div>
            </div>
        </div>
    );

}

export default HeaderMenu;