
export interface Proposal {
  address: string,
  msg: {
    "version": string,
    "timestamp": string,
    "space": string,
    "type": "proposal",
    "payload": {
      "end": number,
      "body": string,
      "name": string,
      "start": number,
      "choices": string,
      "metadata": unknown,
      "snapshot": number,
      "maxCanSelect": number
    }
  };
  sig: string,
  authorIpfsHash: string,
  relayerIpfsHash: string
}

export interface Vote {
  address: string,
  msg: unknown
  sig: string,
  authorIpfsHash: string,
  relayerIpfsHash: string
}

export interface ProposalMap {
  [key: string]: Proposal
}

export interface VoteMap {
  [key: string]: Vote
}