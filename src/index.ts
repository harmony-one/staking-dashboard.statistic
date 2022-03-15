import { dbConnect } from './database';
import { syncSnapshot } from './snapshot';
import { ProposalModel } from './snapshot/models/Proposal';
import { VoteModel } from './snapshot/models/Vote';
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  return res.json({
    status: 'ok',
  });
});

app.get('/validators/:validatorId/votes', async (req, res) => {
  const { validatorId } = req.params;

  const proposalCount = await ProposalModel.count();
  const voteCount = await VoteModel.count({ voter: validatorId });

  return res.json({
    proposalCount,
    voteCount,
  });
});

const startSync = async () => {
  await syncSnapshot();

  setTimeout(() => {
    syncSnapshot();
  }, 1000 * 60 * 60 * 24);
};

const main = async () => {
  app.listen(PORT, () => {
    console.log(`### App listening on port ${PORT}`);
  });

  await dbConnect();
  startSync();
};

main();
