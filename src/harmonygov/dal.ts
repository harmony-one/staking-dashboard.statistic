import fetch from 'node-fetch';
import { response } from 'express';
import { ProposalMap, Vote, VoteMap } from './types';
import axios from 'axios';

const proposalListUrl = 'https://snapshot.hmny.io/api/staking-mainnet/proposals';
const proposalUrl = 'https://snapshot.hmny.io/api/staking-mainnet/proposal';


export const loadProposalList = async () => {
  const response = await axios.get(proposalListUrl);

  if (response.status !== 200) {
    throw new Error('ProposalList not found');
  }

  return Object.values(response.data as ProposalMap);
}

export const loadVoteList = async (proposalId: string) => {
  const response = await axios.get(`${proposalUrl}/${proposalId}`);

  if (response.status !== 200) {
    throw new Error('Proposal not found');
  }

  return Object.values(response.data as VoteMap);
}