import { CONFIG } from 'src/config';
import { getRpcProvider } from 'src/utils/getRpcProvider';
import { verifyK1Signature } from 'src/utils/verifyK1Signature';
import {
  CLAVE_REGISTRY_ABI,
  verifyR1Signature,
} from 'src/utils/verifyR1Signature';
import { Contract } from 'zksync-web3';

export const verifySignature = async (
  message: string,
  signature: string,
  publicAddress: string,
): Promise<boolean> => {
  const provider = getRpcProvider();

  const registryContract = new Contract(
    CONFIG.CLAVE_REGISTRY_ADDRESS,
    CLAVE_REGISTRY_ABI,
    provider,
  );

  const isClave = await registryContract.isClave(publicAddress);

  if (isClave) {
    return await verifyR1Signature(message, signature, publicAddress);
  } else {
    return await verifyK1Signature(message, signature, publicAddress);
  }
};
