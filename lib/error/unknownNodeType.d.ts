import { ZargonError } from "./index";
export declare class UnknownNodeType extends ZargonError {
    nodeType: string;
    constructor(nodeType: string);
}
