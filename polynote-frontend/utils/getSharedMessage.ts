export const getSharedMessage = (noteId: string) => {
  return `Here is a shared link Polynote:

${window.location.origin}/shared/${noteId}
  `;
};
