export default [
  { inputs: [], name: 'CallFailed', type: 'error' },
  { inputs: [], name: 'InvalidBalance', type: 'error' },
  { inputs: [], name: 'InvalidBalanceDiff', type: 'error' },
  { inputs: [], name: 'InvalidLength', type: 'error' },
  { inputs: [], name: 'TransferFailed', type: 'error' },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: '_minMintAmount', type: 'uint256' },
          { internalType: 'uint256', name: '_depositAmount', type: 'uint256' },
          { internalType: 'address', name: '_target', type: 'address' },
          { internalType: 'address', name: '_depositToken', type: 'address' },
          { internalType: 'bytes[]', name: '_callData', type: 'bytes[]' },
        ],
        internalType: 'struct FunctionParameters.BatchHandler',
        name: 'data',
        type: 'tuple',
      },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'multiTokenSwapAndDeposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: '_minMintAmount', type: 'uint256' },
          { internalType: 'uint256', name: '_depositAmount', type: 'uint256' },
          { internalType: 'address', name: '_target', type: 'address' },
          { internalType: 'address', name: '_depositToken', type: 'address' },
          { internalType: 'bytes[]', name: '_callData', type: 'bytes[]' },
        ],
        internalType: 'struct FunctionParameters.BatchHandler',
        name: 'data',
        type: 'tuple',
      },
    ],
    name: 'multiTokenSwapETHAndTransfer',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]
