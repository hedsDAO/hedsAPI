import { Request, Response } from 'express';
import { verifyWalletSignature } from '../utils/verifySignature';
import { determineProposalStatus } from '../utils/determineProposalStatus';
import { PrismaClient } from '@prisma/client';
import { ProposalState } from 'hedsvote';

const prisma = new PrismaClient();

/**
 * Cast a vote for a proposal.
 *
 * This function allows a voter to cast or update their vote for a given proposal.
 * If the proposal is not in an open state or if the voter's signature does not match the recovered address,
 * the function will return an error.
 *
 * @param {Request} req - Express request object with the vote, voteChoices, message, and signature in the body.
 * @param {Response} res - Express response object used to return the result of the vote casting operation.
 * @async
 * @returns {Promise<Response>} Express response object.
 */
export async function castVote(req: Request, res: Response) {
  const newVote = req.body.vote;
  const voteChoices = req.body.voteChoices;
  const message: string = req.body.message;
  const signature: `0x${string}` = req.body.signature;

  const { vp, voter, proposal_id } = newVote;

  try {
    const proposal = await prisma.proposals.findUnique({
      where: { ipfs_hash: proposal_id },
      select: {
        start_time: true,
        end_time: true,
        is_web3: true,
      },
    });

    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    if (proposal.is_web3) {
      const recoveredAddress = await verifyWalletSignature(message, signature);
      if (recoveredAddress.toLowerCase() !== voter) {
        return res.status(403).json({ error: 'Unauthorized: Signature does not match address' });
      }
    }

    const proposalState = determineProposalStatus(proposal.start_time as Date, proposal.end_time as Date);
    if (proposalState !== ProposalState.OPEN) {
      return res.status(400).json({ error: 'Proposal is not in an open state' });
    }

    const existingVote = await prisma.votes.findFirst({
      where: {
        voter: voter,
        vote_choices: {
          some: { proposal_id: proposal_id },
        },
      },
      select: {
        id: true,
      },
    });

    let voteId;
    if (existingVote) {
      voteId = existingVote.id;

      await prisma.votes.update({
        where: { id: voteId },
        data: {
          signature: signature,
          created: new Date(),
          vp: vp,
          vote_choices: {
            deleteMany: {
              vote_id: voteId,
            },
          },
        },
      });
    } else {
      const createdVote = await prisma.votes.create({
        data: {
          signature: signature,
          created: new Date(),
          vp: vp,
          voter: voter,
        },
        select: {
          id: true,
        },
      });
      voteId = createdVote.id;
    }

    for (const voteChoice of voteChoices) {
      await prisma.vote_choices.create({
        data: {
          vote_id: voteId,
          choice_id: voteChoice.choice_id,
          proposal_id: voteChoice.proposal_id,
          amount: voteChoice.amount,
        },
      });
    }

    return res.status(201).json({ voteId, voteChoices });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
