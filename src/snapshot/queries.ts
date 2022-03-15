export const queryProposals = `query ProposalList($first: Int!, $skip: Int!) {
  proposals(
    first: $first,
    skip: $skip,
    where: {
      space_in: ["harmony-mainnet.eth"],
    },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    choices
    start
    end
    snapshot
    state
    author
    space {
      id
      name
    }
  }
}`;

export const queryVoteList = `query VoteList($proposalId: String!, $first: Int!, $skip: Int!) {
  votes (
    first: $first
    skip: $skip
    where: {
      proposal: $proposalId
    }
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    voter
    created
    proposal {
      id
    }
    choice
    space {
      id
    }
  }
}
`;
