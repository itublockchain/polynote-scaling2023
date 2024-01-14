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
        name: "noteId",
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
        name: "noteId",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_noteId",
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
        name: "_noteId",
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
        name: "_noteId",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "_partners",
        type: "address[]",
      },
    ],
    name: "setPartners",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
