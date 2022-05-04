import { loadProposalList, loadVoteList } from './dal';
import { ProposalModel } from '../database/models/Proposal';
import { VoteModel } from '../database/models/Vote';

const SKIP = 0;
const FIRST = 30;

const syncProposalList = async (skip: number, first: number) => {
  const proposalList = await loadProposalList({ skip, first });

  for (let i = 0; i < proposalList.length; i++) {
    const proposal = proposalList[i];

    await ProposalModel.findByIdAndUpdate(
      proposal.id,
      {
        $set: {
          _id: proposal.id,
          title: proposal.title,
          state: proposal.state,
        },
      },
      { upsert: true },
    );

    await syncVoteList(proposal.id, SKIP, FIRST);
  }

  if (proposalList.length === first) {
    await syncProposalList(skip + FIRST, FIRST);
  }
};

const syncVoteList = async (
  proposalId: string,
  skip: number,
  first: number,
) => {
  const voteList = await loadVoteList({ proposalId, skip, first });

  for (let i = 0; i < voteList.length; i++) {
    const vote = voteList[i];

    await VoteModel.findByIdAndUpdate(
      vote.id,
      {
        $set: {
          _id: vote.id,
          voter: vote.voter,
          proposal: {
            id: vote.proposal.id,
          },
        },
      },
      { upsert: true },
    );
  }

  if (voteList.length === first) {
    await syncVoteList(proposalId, skip + FIRST, FIRST);
  }
};

export const syncSnapshot = async () => {
  await syncProposalList(SKIP, FIRST);
};
