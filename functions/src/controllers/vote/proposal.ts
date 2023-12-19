import { PrismaClient } from '@prisma/client';
import { verifyWalletSignature } from '../utils/verifySignature';
// import { determineProposalStatus } from '../utils/determineProposalStatus';
import { checkSpaceAuthorization } from '../utils/checkSpaceAuthroization';
import { voteMethodEnumToString } from '../utils/voteMethodEnumToString';
import { pinProposalToIpfs, unpinFromIpfs } from '../utils/pinata';

const prisma = new PrismaClient();

export const getProposal = async (ipfsHash: string) => {
  return await prisma.proposals.findUnique({
    where: { ipfs_hash: ipfsHash },
    include: { choices: true, strategies: true, vote_choices: { include: { votes: true } } },
  });
};

export async function createProposal({ proposal, message, signature, user_id }: { proposal: any; message: string; signature: string; user_id: string }) {
  const space = await prisma.spaces.findUnique({ where: { name: proposal.spaceName } });

  if (!space) {
    return 'Space not found';
  }

  if (proposal.is_web3) {
    const recoveredAddress = await verifyWalletSignature(message, signature as `0x${string}`);
    const isAuthorized = await checkSpaceAuthorization(prisma, proposal.spaceName, recoveredAddress);

    if (!isAuthorized) {
      return 'NOT AUTHORIZED';
    }
  }

  const ipfsHash = await pinProposalToIpfs(proposal);

  return await prisma.proposals.create({
    data: {
      ipfs_hash: ipfsHash,
      space_id: space.id,
      signature: signature,
      author: parseInt(user_id),
      start_time: proposal.startTime,
      end_time: proposal.endTime,
      block: proposal.block,
      method: voteMethodEnumToString(proposal.method),
      title: proposal.title,
      description: proposal.description,
      cover: proposal.cover,
      choice_type: proposal.choice_type,
      created_at: proposal.createdAt,
      show_results: proposal.show_results,
      choices: { create: proposal.choices },
    },
  });
}

export async function updateProposal(ipfsHash: string, updatedProposal: any) {
  const currentProposal = await prisma.proposals.findUnique({ where: { ipfs_hash: ipfsHash } });

  if (!currentProposal) {
    return 'Proposal not found';
  }

  return await prisma.proposals.update({
    where: { ipfs_hash: ipfsHash },
    data: {
      signature: updatedProposal.signature,
      start_time: updatedProposal.start_time,
      end_time: updatedProposal.end_time,
      title: updatedProposal.title,
      description: updatedProposal.description,
    },
  });
}

export async function deleteProposal(ipfsHash: string) {
  const currentProposal = await prisma.proposals.findUnique({ where: { ipfs_hash: ipfsHash } });

  if (!currentProposal) {
    return 'Proposal not found';
  }

  await unpinFromIpfs(ipfsHash);

  return await prisma.proposals.delete({ where: { ipfs_hash: ipfsHash } });
}

export async function getTapeFromProposalId(proposalId: string) {
  return await prisma.tapes.findUnique({
    where: { proposal_id: proposalId },
  });
}
