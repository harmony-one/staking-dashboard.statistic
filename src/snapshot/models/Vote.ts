import mongoose from 'mongoose'

interface Vote {
  _id: string,
  voter: string,
  proposal: {
    id: string,
  }
}

const voteSchema = new mongoose.Schema<Vote>({
  _id: String,
  voter: String,
  proposal: {
    id: String,
  }
});

export const VoteModel = mongoose.model('Vote', voteSchema);
