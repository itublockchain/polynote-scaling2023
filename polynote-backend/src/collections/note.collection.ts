export const NoteCollection = `@public
collection Note {
  id: string;
  publicKey: PublicKey;
  address: string;
  emoji: string;
  title: string;
  content: string;

  constructor (id: string, address: string, emoji: string, title: string, content: string) {
    this.id = id;
    this.address = address;
    this.emoji = emoji;
    this.title = title;
    this.content = content;

    this.publicKey = ctx.publicKey;
  }
}`;
