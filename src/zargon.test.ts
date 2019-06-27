import test from "ava";

import { ASTNode, ASTParam, build } from "./zargon";
import { UnknownNodeType } from "./error/unknownNodeType";

abstract class Statement {}

@ASTNode
class BlockStatement<B extends Statement[]> extends Statement {
  constructor(
    @ASTParam("body")
    public body: B,
  ) {
    super();
  }
}

@ASTNode
class PrintStatement extends Statement {
  constructor(
    @ASTParam("messages", true)
    public messages: string[],
  ) {
    super();
  }
}

@ASTNode
class ForeverStatement<S extends Statement> extends Statement {
  constructor(
    @ASTParam("statement")
    public statement: S,
  ) {
    super();
  }
}

test("instatiates the tree", t => {
  const jsonTree = {
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

  const ast: BlockStatement<[PrintStatement, ForeverStatement<PrintStatement>]> = build(jsonTree);

  t.true(ast instanceof BlockStatement);
  t.true(ast.body[0] instanceof PrintStatement);
  t.deepEqual(ast.body[0].messages, ["YOU KNOW WHAT", "?"]);
  t.true(ast.body[1] instanceof ForeverStatement);
  t.true(ast.body[1].statement instanceof PrintStatement);
  t.deepEqual(ast.body[1].statement.messages, ["I want a cookie!"]);
});

test("unknown node type", t => {
  t.throws(() => {
    build({ type: "BluffStatement" });
  }, UnknownNodeType);
});

test("it returns null for a null entry", t => {
  t.is(build(null), null);
});

@ASTNode
class NullLiteral {}

test("supports nodes with arguments", t => {
  const tree = {
    type: "NullLiteral",
  };

  t.true(build(tree) instanceof NullLiteral);
});
