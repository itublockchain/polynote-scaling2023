export const NoteCollection = `@public
collection Note {
  id: string;
  publicKey: PublicKey;
  author: string;
  emoji: string;
  headline: string;
  content: string;

  constructor (id: string, author: string, emoji: string, headline: string, content: string) {
    this.id = id;
    this.author = author;
    this.emoji = emoji;
    this.headline = headline;
    this.content = content;

    this.publicKey = ctx.publicKey;
  }
}`;
