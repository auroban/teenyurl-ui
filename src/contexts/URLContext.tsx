import { createContext } from "react";
import { URLContextProps } from "../interfaces/contextproperties/URLContextProps";

export const URLContext = createContext<URLContextProps | null>(null);