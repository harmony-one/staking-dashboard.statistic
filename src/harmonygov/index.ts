import { loadProposalList, loadVoteList } from './dal';
import { ProposalModel } from '../database/models/Proposal';
import { VoteModel } from '../database/models/Vote';

const syncProposalList = async () => {
  const proposalList = await loadProposalList();

  for (let i = 0; i < proposalList.length; i++) {
    const proposal = proposalList[i];

    await ProposalModel.findByIdAndUpdate(
      proposal.authorIpfsHash,
      {
        $set: {
          _id: proposal.authorIpfsHash,
          title: proposal.msg.payload.name,
          state: 'unknown',
        },
      },
      { upsert: true },
    );

    await syncVoteList(proposal.authorIpfsHash);
  }
};

const syncVoteList = async (
  proposalId: string,
) => {
  const voteList = await loadVoteList(proposalId);

  for (let i = 0; i < voteList.length; i++) {
    const vote = voteList[i];

    await VoteModel.findByIdAndUpdate(
      vote.authorIpfsHash,
      {
        $set: {
          _id: vote.authorIpfsHash,
          voter: vote.address,
          proposal: {
            id: proposalId,
          },
        },
      },
      { upsert: true },
    );
  }
};

export const syncHarmonyGov = async () => {
  await syncProposalList();
};