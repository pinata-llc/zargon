export class ZargonError extends Error {
  constructor(message: string) {
    super(`Zargon: ${message}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
