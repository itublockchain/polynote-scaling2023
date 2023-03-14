export const UserCollection = `collection User {
  id: string;
  publicKey: string;
  signature: string;
  address: string;

  constructor (id: string, signature: string, address: string) {
    this.id = id;
    this.signature = signature;
    this.address = address;
    this.publicKey = ctx.publicKey;
  }

  updateSignature(signature: string) {
    if (this.publicKey != ctx.publicKey) {
      throw error('invalid public key');
    }
    this.signature = signature;
  }
}`;
