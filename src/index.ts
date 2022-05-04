import { dbConnect } from './database';
import { syncSnapshot } from './snapshot';
import { ProposalModel } from './database/models/Proposal';
import { VoteModel } from './database/models/Vote';
import express from 'express';
import { syncHarmonyGov } from './harmonygov';

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

const startSyncStapshot = async () => {
  await syncSnapshot();

  setTimeout(() => {
    startSyncStapshot();
  }, 1000 * 60 * 60 * 24);
};

const startSyncHarmonyGov = async () => {
  await syncHarmonyGov();

  setTimeout(() => {
    startSyncHarmonyGov();
  }, 1000 * 60 * 60 * 24);
};

const main = async () => {
  app.listen(PORT, () => {
    console.log(`### App listening on port ${PORT}`);
  });

  await dbConnect();
  startSyncStapshot();
  startSyncHarmonyGov();
};

main();
