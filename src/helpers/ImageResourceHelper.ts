import imgLogo from "../resources/images/link-logo-64.png"

import ImageResource from "../interfaces/resources/ImageResource";

class ImageResourceHelper {

    public static async getLogo() : Promise<ImageResource> {
        return {
            path: imgLogo,
            altText: "logo"
        }
    }

};

export default ImageResourceHelper;