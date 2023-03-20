/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface LockInterface extends utils.Interface {
  functions: {
    "addPartner(address)": FunctionFragment;
    "isShared(address,address)": FunctionFragment;
    "removePartner(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "addPartner" | "isShared" | "removePartner"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addPartner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isShared",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removePartner",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "addPartner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isShared", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removePartner",
    data: BytesLike
  ): Result;

  events: {
    "Shared(address,address)": EventFragment;
    "Unshared(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Shared"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unshared"): EventFragment;
}

export interface SharedEventObject {
  owner: string;
  partner: string;
}
export type SharedEvent = TypedEvent<[string, string], SharedEventObject>;

export type SharedEventFilter = TypedEventFilter<SharedEvent>;

export interface UnsharedEventObject {
  owner: string;
  partner: string;
}
export type UnsharedEvent = TypedEvent<[string, string], UnsharedEventObject>;

export type UnsharedEventFilter = TypedEventFilter<UnsharedEvent>;

export interface Lock extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LockInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addPartner(
      _partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isShared(
      _owner: PromiseOrValue<string>,
      _partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    removePartner(
      _partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addPartner(
    _partner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isShared(
    _owner: PromiseOrValue<string>,
    _partner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  removePartner(
    _partner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPartner(
      _partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isShared(
      _owner: PromiseOrValue<string>,
      _partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removePartner(
      _partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Shared(address,address)"(owner?: null, partner?: null): SharedEventFilter;
    Shared(owner?: null, partner?: null): SharedEventFilter;

    "Unshared(address,address)"(
      owner?: null,
      partner?: null
    ): UnsharedEventFilter;
    Unshared(owner?: null, partner?: null): UnsharedEventFilter;
  };

  estimateGas: {
    addPartner(
      _partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isShared(
      _owner: PromiseOrValue<string>,
      _partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removePartner(
      _partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPartner(
      _partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isShared(
      _owner: PromiseOrValue<string>,
      _partner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removePartner(
      _partner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
