import "./URLValidityView.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const URLValidityView = () => {

    let menuItems = [ "DAY", "MONTH", "YEAR" ];
    
    return (
        <div className="url-validity-view">
            <div className="grid-center">
                <label className="no-margin label-text behavior--not-selectable">Valid For</label>
            </div>
            <div className="grid-center no-margin no-padding">
                <input type="number" maxLength={4} min={1} max={9999} defaultValue={1} pattern="\d*" className="url-validity-view__duration-textfield label-text no-margin no-padding"/>
            </div>
            <div className="grid-center">
                <DropdownMenu className="url-validity-view__dropdown" header="Duration" items={ menuItems } onClick={(param : string) => console.info("Item Clicked: ", param)}></DropdownMenu>
            </div>
        </div>
    );
}

export default URLValidityView;