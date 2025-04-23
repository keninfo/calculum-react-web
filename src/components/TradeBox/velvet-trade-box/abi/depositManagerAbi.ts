export default [
  {
    inputs: [{ internalType: 'address', name: '_depositBatch', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
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
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
