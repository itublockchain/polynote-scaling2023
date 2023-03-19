export const UserCollection = `@public
collection User {
  id: string;
  publicKey: PublicKey;
  signature: string;
  address: string;
  name?: string;

  constructor (id: string, signature: string, address: string) {
    this.id = id;
    this.signature = signature;
    this.address = address;
    this.publicKey = ctx.publicKey;
  }

  updateName(name: string) {
    if (this.publicKey != ctx.publicKey) {
      throw error('invalid public key');
    }
    this.name = name;
  }

  updateSignature(signature: string) {
    if (this.publicKey != ctx.publicKey) {
      throw error('invalid public key');
    }
    this.signature = signature;
  }

  deleteUser() {
    if (this.publicKey != ctx.publicKey) {
      throw error('invalid public key');
    }
    selfdestruct();
  }
}`;
