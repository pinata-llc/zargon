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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var zargon_1 = require("./zargon");
var unknownNodeType_1 = require("./error/unknownNodeType");
var Statement = /** @class */ (function () {
    function Statement() {
    }
    return Statement;
}());
var BlockStatement = /** @class */ (function (_super) {
    __extends(BlockStatement, _super);
    function BlockStatement(body) {
        var _this = _super.call(this) || this;
        _this.body = body;
        return _this;
    }
    BlockStatement = __decorate([
        zargon_1.ASTNode,
        __param(0, zargon_1.ASTParam("body")),
        __metadata("design:paramtypes", [Object])
    ], BlockStatement);
    return BlockStatement;
}(Statement));
var PrintStatement = /** @class */ (function (_super) {
    __extends(PrintStatement, _super);
    function PrintStatement(messages) {
        var _this = _super.call(this) || this;
        _this.messages = messages;
        return _this;
    }
    PrintStatement = __decorate([
        zargon_1.ASTNode,
        __param(0, zargon_1.ASTParam("messages", true)),
        __metadata("design:paramtypes", [Array])
    ], PrintStatement);
    return PrintStatement;
}(Statement));
var ForeverStatement = /** @class */ (function (_super) {
    __extends(ForeverStatement, _super);
    function ForeverStatement(statement) {
        var _this = _super.call(this) || this;
        _this.statement = statement;
        return _this;
    }
    ForeverStatement = __decorate([
        zargon_1.ASTNode,
        __param(0, zargon_1.ASTParam("statement")),
        __metadata("design:paramtypes", [Object])
    ], ForeverStatement);
    return ForeverStatement;
}(Statement));
ava_1.default("instatiates the tree", function (t) {
    var jsonTree = {
        type: "BlockStatement",
        body: [
            {
                type: "PrintStatement",
                messages: ["YOU KNOW WHAT", "?"],
            },
            {
                type: "ForeverStatement",
                statement: {
                    type: "PrintStatement",
                    messages: ["I want a cookie!"],
                },
            },
        ],
    };
    var ast = zargon_1.build(jsonTree);
    t.true(ast instanceof BlockStatement);
    t.true(ast.body[0] instanceof PrintStatement);
    t.deepEqual(ast.body[0].messages, ["YOU KNOW WHAT", "?"]);
    t.true(ast.body[1] instanceof ForeverStatement);
    t.true(ast.body[1].statement instanceof PrintStatement);
    t.deepEqual(ast.body[1].statement.messages, ["I want a cookie!"]);
});
ava_1.default("unknown node type", function (t) {
    t.throws(function () {
        zargon_1.build({ type: "BluffStatement" });
    }, unknownNodeType_1.UnknownNodeType);
});
ava_1.default("it returns null for a null entry", function (t) {
    t.is(zargon_1.build(null), null);
});
var NullLiteral = /** @class */ (function () {
    function NullLiteral() {
    }
    NullLiteral = __decorate([
        zargon_1.ASTNode
    ], NullLiteral);
    return NullLiteral;
}());
ava_1.default("supports nodes with arguments", function (t) {
    var tree = {
        type: "NullLiteral",
    };
    t.true(zargon_1.build(tree) instanceof NullLiteral);
});
