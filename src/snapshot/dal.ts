import { queryProposals, queryVoteList } from './queries';
import { graphQLClient } from './graphQLClient';

interface LoadProposalListProps {
  first: number;
  skip: number;
}

export const loadProposalList = async (params: LoadProposalListProps) => {
  const { first = 30, skip = 0 } = params;

  const response = await graphQLClient.request(queryProposals, { first, skip });

  const { proposals } = response;

  return proposals;
};

interface LoadVoteListParams {
  proposalId: string;
  first?: number;
  skip?: number;
}
export const loadVoteList = async (params: LoadVoteListParams) => {
  const { proposalId, first = 30, skip = 0 } = params;

  const response = await graphQLClient.request(queryVoteList, {
    proposalId,
    first,
    skip,
  });

  return response.votes;
};
