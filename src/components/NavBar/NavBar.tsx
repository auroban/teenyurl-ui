import { useEffect, useState } from "react";
import StringConstants from "../../constants/StringConstants";
import ImageResource from "../../interfaces/resources/ImageResource";
import "./NavBar.css";
import NavBrand from "../NavBrand/NavBrand";
import NavMenu from "../NavMenu/NavMenu";
import ImageResourceHelper from "../../helpers/ImageResourceHelper";

type State = {
    logoImage: ImageResource | null
}

const NavBar = () => {

    const [state, setState] = useState<State>({
        logoImage: null
    });

    const menuItems = [ StringConstants.MENU_HOME, StringConstants.MENU_DOCS ];

    useEffect(() => {
        console.debug("Fetched Header Resources");
        const fetchAndUpdate = async () => {
            const logo = await ImageResourceHelper.getLogo();
            console.debug("Fetched Header Logo: ", logo);
            setState(prev => ({ ...prev, logoImage: logo }));
        };

        fetchAndUpdate();
    }, []);

    const onNavBrandClick = () => {
        window.open(".", "_self");
    }

    return (
        <div className="nav-bar">
            { state.logoImage ? 
                <NavBrand 
                    logoImage={ state.logoImage } 
                    logoText={ StringConstants.LOGO_TEXT }
                    onClick={ onNavBrandClick } /> 
            : null }
            <NavMenu namesOfButtons={ menuItems } />
        </div>
    );

}

export default NavBar;