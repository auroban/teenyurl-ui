import { useEffect, useRef, useState } from "react";

import "./DropdownMenu.css"
import ImageResource from "../../interfaces/resources/ImageResource";
import ImageResourceHelper from "../../helpers/ImageResourceHelper";

type Props = {
    className?: string,
    header: string,
    items : Array<string>, 
    onClick : (param : number) => void, 
    defaultIndex? : number,
}

type State = {
    menuState: string,
    arrowClassNames: string,
    menuItemsClassNames: string,
    selectedIndex: number,
    ddIconResource: ImageResource | null,
}

const DropdownMenu = (props: Props) => {

    const refContainer = useRef<HTMLDivElement>(null);

    const stateOpen = "OPEN";
    const stateClosed = "CLOSED";
    const stateInit = "INIT";

    const [internalState, setInternalState] = useState<State>({
        menuState : stateInit,
        arrowClassNames : "",
        menuItemsClassNames : "state-collapsed",
        selectedIndex : props.defaultIndex ? props.defaultIndex : -1,
        ddIconResource : null
    });
    

    const stateRef = useRef(internalState.menuState);

    useEffect(() => {

        const fetchAndUpdate = async () => {
            const ic = await ImageResourceHelper.getDropDownArrow();
            setInternalState(prevState => ({...prevState, ddIconResource : ic}));
        }

        fetchAndUpdate();

        const detectClickOutside = (ev: MouseEvent) => {
            if (refContainer.current 
                && !refContainer.current.contains(ev.target as Node)
                && stateRef.current === stateOpen) {
                    toggleMenu(stateRef.current)
            }
        }

        document.addEventListener("mousedown", detectClickOutside);

        return () => {
            document.removeEventListener("mousedown", detectClickOutside);
        }

    }, []);

    useEffect(() => {
        stateRef.current = internalState.menuState;
    }, [internalState.menuState])

    const items = props.items.map((item, index) => {
        return (
            <div 
                key={`dd-mi-${index}`} 
                className="alignment--div--center dd-menu-item label-text behavior--pointer-on-hover behavior--not-selectable" 
                onClick={() => handleDuratioSelection(index)}>
                    <label className="label-text behavior--pointer-on-hover behavior--not-selectable">
                        {item}
                    </label>
            </div>
        );
    });

    const toggleMenu = (state: string) => {
        if (state === stateInit || state === stateClosed) {
            setInternalState(prevState => ({...prevState, 
                arrowClassNames : "behavior--pointer-on-hover behavior--not-selectable animate-arrow-up",
                menuItemsClassNames : "behavior--not-selectable state-expanded",
                menuState : stateOpen}));
        } else {
            setInternalState(prevState => ({...prevState, 
                arrowClassNames : "behavior--pointer-on-hover behavior--not-selectable animate-arrow-down",
                menuItemsClassNames : "behavior--not-selectable state-collapsed",
                menuState : stateClosed}));
        }
    }

    const handleDuratioSelection = (index : number) => {
        setInternalState(prevState => ({...prevState, selectedIndex : index}))
        toggleMenu(internalState.menuState);
        props.onClick(index);
    }

    

    return (
        <div className={ `dd-menu-container ${ props.className }` } ref={ refContainer }>
            <div 
                className="dd-menu-header behavior--not-selectable" 
                onClick={() => toggleMenu(internalState.menuState)}>
                <div className="alignment--div--center dd-menu-header-item behavior--pointer-on-hover behavior--not-selectable">
                    <label 
                        className="behavior--not-selectable behavior--pointer-on-hover label-text" 
                        style={ internalState.selectedIndex === -1 ? {color: "#dadada"} : {} }>
                            { internalState.selectedIndex === -1 ? props.header : props.items[internalState.selectedIndex] }
                    </label>
                </div>
                <div className="alignment--div--center dd-menu-header-item behavior--not-selectable behavior--pointer-on-hover">
                    <img 
                        className={ `dd-header-image alignment--image--stretched-to-fit ${ internalState.arrowClassNames }` } 
                        src={ internalState.ddIconResource?.path } 
                        alt={ internalState.ddIconResource?.altText }></img>
                </div>
            </div>
            <div className={ `dd-menu-items ${ internalState.menuItemsClassNames }` } >
                {items}
            </div>
        </div>
    );

}

export default DropdownMenu;