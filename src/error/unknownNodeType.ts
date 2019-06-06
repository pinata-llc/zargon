import { ZargonError } from "./index";

export class UnknownNodeType extends ZargonError {
  constructor(public nodeType: string) {
    super(`Node type: \`${nodeType}\` not implemented`);
  }
}
