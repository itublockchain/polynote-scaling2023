export const NoteCollection = `@public
collection Note {
  id: string;
  publicKey: PublicKey;
  address: string;
  emoji: string;
  title: string;
  content: string;
  created: number;
  updated: number;

  constructor (id: string, address: string, emoji: string, title: string, content: string, created: number, updated: number) {
    this.id = id;
    this.address = address;
    this.emoji = emoji;
    this.title = title;
    this.content = content;
    this.created = created;
    this.updated = updated;

    this.publicKey = ctx.publicKey;
  }
}`;
