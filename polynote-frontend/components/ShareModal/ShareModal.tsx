import { POLYNOTE_ABI } from "consts/abi";
import { MOCK_VALIDATOR, POLYNOTE_CONTRACT } from "consts/contracts";
import { BigNumber, ethers } from "ethers";
import { ModalController } from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Note } from "recoil/notes/types";
import { Button, Input, Modal, Typography } from "ui";
import { formatAddress } from "utils/formatAddress";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useSignMessage,
  useSwitchNetwork,
} from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCopyText } from "hooks/useCopyText";
import { getSharedMessage } from "utils/getSharedMessage";
import { useNotify } from "hooks/useNotify";
import { useListenNetworkChange } from "hooks/useListenNetworkChange";
import { zksync_testnet } from "consts/chains";
import { useMutation } from "react-query";
import { EIP712Signer, Provider, types, utils } from "zksync-web3";

type Props = {
  modalController: ModalController;
  selectedNote: Note;
};

const provider = new Provider(zksync_testnet.rpcUrls.default.http[0]);

export const parseHex = (hex: string): string => {
  if (hex.startsWith("0x")) {
    return hex.slice(2);
  }
  return hex;
};

export const hexToBuffer = (hex: string): Buffer => {
  return Buffer.from(parseHex(hex), "hex");
};
/** Converts DER signature to R and S */
export const derSignatureToRs = (
  derSignature: string
): { r: ethers.BigNumber; s: ethers.BigNumber } => {
  /*
      DER signature format:
      0x30 <length total> 0x02 <length r> <r> 0x02 <length s> <s>
  */
  const derBuffer = hexToBuffer(derSignature);

  const rLen = derBuffer[3];
  const rOffset = 4;
  const rBuffer = derBuffer.slice(rOffset, rOffset + rLen);
  const sLen = derBuffer[5 + rLen];
  const sOffset = 6 + rLen;
  const sBuffer = derBuffer.slice(sOffset, sOffset + sLen);

  const r = ethers.BigNumber.from(rBuffer);
  const s = ethers.BigNumber.from(sBuffer);
  return { r, s };
};

export const ShareModal = ({ modalController, selectedNote }: Props) => {
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [addingAddress, setAddingAddress] = useState("");
  const { switchNetwork } = useSwitchNetwork({
    chainId: zksync_testnet.id,
  });
  const { signMessageAsync } = useSignMessage();
  const { address } = useAccount();
  const network = useNetwork();
  const [isChainIdCorrect, setIsChainIdCorrect] = useState(true);
  const notify = useNotify();

  useListenNetworkChange(1000, !modalController.isOpen);

  const [copied, onCopy] = useCopyText();

  const { data, refetch } = useContractRead<any, "getSharedAddress", string[]>({
    abi: POLYNOTE_ABI,
    address: POLYNOTE_CONTRACT,
    functionName: "getSharedAddresses",
    args: [selectedNote.address, selectedNote.id],
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (address == null) {
        return;
      }
      const nonce = await provider.getTransactionCount(address);
      const chainId = (await provider.getNetwork()).chainId;
      const gasPrice = await provider.getGasPrice();

      const iface = new ethers.utils.Interface(POLYNOTE_ABI);
      const calldata = iface.encodeFunctionData("setPartners", [
        selectedNote.id,
        whitelist,
      ]);

      const transaction: types.TransactionRequest = {
        data: calldata,
        to: POLYNOTE_CONTRACT,
        from: address,
        value: BigNumber.from(0),
        chainId,
        nonce,
        type: 113,
        gasPrice,
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          customSignature: undefined,
        },
        gasLimit: 1_000_000,
      };

      try {
        const gasEstimation = await provider.estimateGas(transaction);
        transaction.gasLimit = gasEstimation.toNumber();
      } catch {}

      const signedTxHash = EIP712Signer.getSignedDigest(transaction).toString();

      const signature = await signMessageAsync({
        message: signedTxHash.toString(),
      });
      const { r, s } = derSignatureToRs(signature);
      const finalSignature = r._hex.concat(parseHex(s._hex));

      const formattedSignature = ethers.utils.defaultAbiCoder.encode(
        ["bytes", "address", "bytes[]"],
        [finalSignature, MOCK_VALIDATOR, []]
      );

      const finalTransaction = {
        ...transaction,
        customData: {
          ...transaction.customData,
          customSignature: formattedSignature,
        },
      };

      await provider.sendTransaction(utils.serialize(finalTransaction));
    },
    onSuccess: () => {
      notify.success("Note shared successfully");
      modalController.close();
      setTimeout(() => {
        refetch();
      }, 2500);
    },
  });

  // const { write, isLoading: isLoadingSet } = useContractFunction({
  //   abi: POLYNOTE_ABI,
  //   address: POLYNOTE_CONTRACT,
  //   method: "setPartners",
  //   onSuccess: () => {
  //     notify.success("Note shared successfully");
  //     setTimeout(() => {
  //       refetch();
  //     }, 1000);
  //     setTimeout(() => {
  //       refetch();
  //     }, 4000);
  //   },
  //   onFail: (err) => {
  //     formatRpcErrorMessage(err);
  //   },
  // });

  useEffect(() => {
    if (Array.isArray(data)) {
      setWhitelist(data ?? []);
    }
  }, [data]);

  const addingError = useMemo(() => {
    if (whitelist.includes(addingAddress)) {
      return "Address already in list";
    }

    if (!ethers.utils.isAddress(addingAddress)) {
      return "Invalid ETH address";
    }

    return null;
  }, [whitelist, addingAddress]);

  useEffect(() => {
    const fn = async () => {
      setIsChainIdCorrect(network.chain?.id === zksync_testnet.id);
    };
    fn();
  }, [network]);

  return (
    <Modal width="540px" modalController={modalController}>
      <div className="flex flex-col">
        <Typography
          weight="medium"
          className="text-MAIN_DARK dark:text-PINK"
          variant="title4"
        >
          Share
        </Typography>
        <Typography
          className="text-MAIN_DARK dark:text-PINK mt-2"
          variant="body2"
        >
          You can control who can see the documents and share them.
        </Typography>

        <div className="flex space-x-1">
          <Input
            error={
              addingError != null && addingAddress.trim() != ""
                ? addingError
                : null
            }
            containerClassName="mt-1 w-full"
            label="ETH Address"
            value={addingAddress}
            onChange={(e) => setAddingAddress(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setWhitelist([...whitelist, addingAddress]);
            setAddingAddress("");
          }}
          disabled={addingError != null}
          color="secondary"
          className="h-12 mt-2 w-full"
        >
          Add
        </Button>

        <div className="flex flex-wrap mt-4">
          {whitelist.map((item) => {
            return (
              <div
                key={item}
                className="p-2 pr-1 flex items-center text-white bg-DARK_PURPLE rounded-md mt-1 mr-1"
              >
                <span>{formatAddress(item)}</span>
                <div
                  onClick={() => {
                    setWhitelist(whitelist.filter((i) => i != item));
                  }}
                  className="ml-[4px] hover:bg-MAIN_DARK p-1 cursor-pointer"
                >
                  <AiOutlineClose />
                </div>
              </div>
            );
          })}
          {whitelist.length === 0 && (
            <Typography
              variant="body2"
              className="text-MAIN_DARK dark:text-PINK"
            >
              There is no user in whitelist
            </Typography>
          )}
        </div>

        <Button
          loading={mutation.isLoading}
          onClick={() => {
            if (isChainIdCorrect) {
              mutation.mutate();
              // write(selectedNote.id, whitelist);
            } else {
              switchNetwork?.();
            }
          }}
          color="primary"
          className="h-10 mt-4"
        >
          {isChainIdCorrect ? "Update whitelist" : "Wrong network"}
        </Button>

        <div className="flex w-full justify-center space-x-1 items-center mt-4">
          <CopyToClipboard
            onCopy={onCopy}
            text={getSharedMessage(selectedNote.id)}
          >
            <Typography
              className="cursor-pointer text-blue-400 text-center"
              variant="caption"
              weight="regular"
            >
              Copy share link
            </Typography>
          </CopyToClipboard>
          {copied ? <AiOutlineCheck className="text-green-500" /> : null}
        </div>
      </div>
    </Modal>
  );
};
