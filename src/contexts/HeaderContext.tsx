import { createContext } from "react";
import HeaderContextProps from "../interfaces/contextproperties/HeaderContextProps";

const HeaderContext = createContext<HeaderContextProps | null>(null);

export default HeaderContext;