import "reflect-metadata";
import { UnknownNodeType } from "./error/unknownNodeType";

// TODO: Find a way to type a class with a constructor that takes any arguments
type INodeClass = any;

interface INodeTypes {
  [type: string]: INodeClass;
}

const allNodeTypes: INodeTypes = {};

export function ASTNode(target: INodeClass) {
  allNodeTypes[target.name] = target;
}

const NODE_PARAMS_KEY = "zargon:AST:node:params";

export function ASTParam(name: string, isLiteral: boolean = false) {
  return (target: any, _prop: string, ordinal: number) => {
    const params = Reflect.getMetadata(NODE_PARAMS_KEY, target) || [];
    params[ordinal] = { name, isLiteral };
    Reflect.defineMetadata(NODE_PARAMS_KEY, params, target);
  };
}

interface IEntry {
  type: string;
  [param: string]: any;
}

export function build<T extends IEntry>(entry: T | null, nodeTypes: INodeTypes = allNodeTypes) {
  if (entry === null) {
    return entry;
  }

  const nodeClass = nodeTypes[entry.type];

  if (!nodeClass) {
    throw new UnknownNodeType(entry.type);
  }

  const paramMeta = Reflect.getMetadata(NODE_PARAMS_KEY, nodeClass);
  const params = [];

  if (paramMeta) {
    for (const { name, isLiteral } of paramMeta) {
      let param = entry[name];

      if (!isLiteral) {
        if (Array.isArray(param)) {
          const statements = param;
          param = [];

          for (const statement of statements) {
            param.push(build(statement, nodeTypes));
          }
        } else if (typeof param === "object") {
          param = build(param, nodeTypes);
        }
      }

      params.push(param);
    }
  }

  return new nodeClass(...params);
}
