"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var unknownNodeType_1 = require("./error/unknownNodeType");
var allNodeTypes = {};
function ASTNode(target) {
    allNodeTypes[target.name] = target;
}
exports.ASTNode = ASTNode;
var NODE_PARAMS_KEY = "zargon:AST:node:params";
function ASTParam(name, isLiteral) {
    if (isLiteral === void 0) { isLiteral = false; }
    return function (target, _prop, ordinal) {
        var params = Reflect.getMetadata(NODE_PARAMS_KEY, target) || [];
        params[ordinal] = { name: name, isLiteral: isLiteral };
        Reflect.defineMetadata(NODE_PARAMS_KEY, params, target);
    };
}
exports.ASTParam = ASTParam;
function build(entry, nodeTypes) {
    if (nodeTypes === void 0) { nodeTypes = allNodeTypes; }
    if (entry === null) {
        return entry;
    }
    var nodeClass = nodeTypes[entry.type];
    if (!nodeClass) {
        throw new unknownNodeType_1.UnknownNodeType(entry.type);
    }
    var paramMeta = Reflect.getMetadata(NODE_PARAMS_KEY, nodeClass);
    var params = [];
    for (var _i = 0, paramMeta_1 = paramMeta; _i < paramMeta_1.length; _i++) {
        var _a = paramMeta_1[_i], name = _a.name, isLiteral = _a.isLiteral;
        var param = entry[name];
        if (!isLiteral) {
            if (Array.isArray(param)) {
                var statements = param;
                param = [];
                for (var _b = 0, statements_1 = statements; _b < statements_1.length; _b++) {
                    var statement = statements_1[_b];
                    param.push(build(statement, nodeTypes));
                }
            }
            else if (typeof param === "object") {
                param = build(param, nodeTypes);
            }
        }
        params.push(param);
    }
    return new (nodeClass.bind.apply(nodeClass, [void 0].concat(params)))();
}
exports.build = build;
