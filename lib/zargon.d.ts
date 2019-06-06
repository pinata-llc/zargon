import "reflect-metadata";
declare type INodeClass = any;
interface INodeTypes {
    [type: string]: INodeClass;
}
export declare function ASTNode(target: INodeClass): void;
export declare function ASTParam(name: string, isLiteral?: boolean): (target: any, _prop: string, ordinal: number) => void;
interface IEntry {
    type: string;
    [param: string]: any;
}
export declare function build<T extends IEntry>(entry: T | null, nodeTypes?: INodeTypes): any;
export {};
