import { useContext } from "react";
import { SharedContext } from "./sharedContext";


export const useSharedContext = () => useContext(SharedContext);
