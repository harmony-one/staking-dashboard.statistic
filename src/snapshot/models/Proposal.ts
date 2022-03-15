import mongoose from 'mongoose'

interface Proposal {
  _id: string;
  title: string;
  state: string;
}


const proposalSchema = new mongoose.Schema<Proposal>({
  _id: String,
  title: String,
  state: String,
});

export const ProposalModel = mongoose.model('Proposal', proposalSchema);


// ProposalModel.
