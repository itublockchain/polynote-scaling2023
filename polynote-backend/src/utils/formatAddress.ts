export const formatAddress = (address: string, pad = 5) => {
  return (
    address?.substring?.(0, pad) +
    '...' +
    address?.substring?.(address?.length - pad)
  );
};
