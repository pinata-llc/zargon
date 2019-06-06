"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var UnknownNodeType = /** @class */ (function (_super) {
    __extends(UnknownNodeType, _super);
    function UnknownNodeType(nodeType) {
        var _this = _super.call(this, "Node type: `" + nodeType + "` not implemented") || this;
        _this.nodeType = nodeType;
        return _this;
    }
    return UnknownNodeType;
}(index_1.ZargonError));
exports.UnknownNodeType = UnknownNodeType;
