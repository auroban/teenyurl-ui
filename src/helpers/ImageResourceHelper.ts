import imgLogo from "../assets/images/link-logo-64.png"
import iconDDArrow from "../assets/images/dropdown-arrow-16.png";

import ImageResource from "../interfaces/resources/ImageResource";

class ImageResourceHelper {

    public static async getLogo() : Promise<ImageResource> {
        return {
            path: imgLogo,
            altText: "logo"
        }
    }

    public static async getDropDownArrow() : Promise<ImageResource> {
        return {
            path: iconDDArrow,
            altText: "icon-dropdown-arrow"
        }
    }

};

export default ImageResourceHelper;