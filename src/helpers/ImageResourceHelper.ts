import imgLogo from "../assets/images/link-logo-64.png"
import iconDDArrow from "../assets/images/dropdown-arrow-16.png";
import iconClose from "../assets/images/ic_close.png";
import iconCopy from "../assets/images/ic_copy.png";

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

    public static async getCloseIcon() : Promise<ImageResource> {
        return {
            path : iconClose,
            altText : "close"
        }
    }

    public static async getCopyIcon() : Promise<ImageResource> {
        return {
            path : iconCopy,
            altText : "copy"
        }
    }
};

export default ImageResourceHelper;