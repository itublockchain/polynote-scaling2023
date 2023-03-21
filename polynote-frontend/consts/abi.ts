export const POLYNOTE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "notId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "Shared",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "notId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "partner",
        type: "address",
      },
    ],
    name: "Unshared",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_notId",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "_partners",
        type: "address[]",
      },
    ],
    name: "addPartners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_notId",
        type: "string",
      },
    ],
    name: "getSharedAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_notId",
        type: "string",
      },
      {
        internalType: "address",
        name: "_partner",
        type: "address",
      },
    ],
    name: "isShared",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_notId",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "_partners",
        type: "address[]",
      },
    ],
    name: "removePartners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
