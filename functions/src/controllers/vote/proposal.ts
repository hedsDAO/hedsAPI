import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verifyWalletSignature } from "../utils/verifySignature";
import { determineProposalStatus } from "../utils/determineProposalStatus";
import { checkSpaceAuthorization } from "../utils/checkSpaceAuthroization";
import { voteMethodEnumToString } from "../utils/voteMethodEnumToString";
import { pinProposalToIpfs, unpinFromIpfs } from "../utils/pinata";

const prisma = new PrismaClient();

export async function getProposal(req: Request, res: Response) {
    const ipfsHash: string = req.params.ipfs_hash;

    try {
        const proposal = await prisma.proposals.findUnique({
            where: { ipfs_hash: ipfsHash },
            include: { choices: true, strategies: true, votes: { include: { vote_choices: true}}} 
        });

        if (!proposal) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        return res.status(200).json({...proposal, state: determineProposalStatus(proposal.start_time as Date, proposal.end_time as Date)});
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createProposal(req: Request, res: Response) {
    const { proposal, message, signature, user_id } = req.body;

    try {
        const space = await prisma.spaces.findUnique({ where: { name: proposal.spaceName } });

        if (!space) {
            return res.status(404).json({ error: "Space not found" });
        }

        if (proposal.is_web3) {
            const recoveredAddress = await verifyWalletSignature(message, signature);
            const isAuthorized = await checkSpaceAuthorization(prisma, proposal.spaceName, recoveredAddress);

            if (!isAuthorized) {
                return res.status(403).json({ error: "User is not authorized to create a proposal in this space" });
            }
        }

        const ipfsHash = await pinProposalToIpfs(proposal);

        const createdProposal = await prisma.proposals.create({
            data: {
                ipfs_hash: ipfsHash,
                space_id: space.id,
                signature: signature,
                author: user_id,
                start_time: proposal.startTime,
                end_time: proposal.endTime,
                block: proposal.block,
                method: voteMethodEnumToString(proposal.method),
                title: proposal.title,
                description: proposal.description,
                cover: proposal.cover,
                choice_type: proposal.choice_type,
                show_results: proposal.show_results,
                choices: { create: proposal.choices }
            }
        });

        return res.status(201).json(createdProposal);

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateProposal(req: Request, res: Response) {
    const { updatedProposal, message, signature } = req.body;
    const ipfsHash: string = req.params.ipfs_hash;

    try {
        const currentProposal = await prisma.proposals.findUnique({ where: { ipfs_hash: ipfsHash } });

        if (!currentProposal) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        if (currentProposal.is_web3) {
            const recoveredAddress = await verifyWalletSignature(message, signature);
            const isAuthorized = await checkSpaceAuthorization(prisma, updatedProposal.spaceName, recoveredAddress);

            if (!isAuthorized) {
                return res.status(403).json({ error: "User is not authorized to update a proposal in this space" });
            }
        }

        const result = await prisma.proposals.update({
            where: { ipfs_hash: ipfsHash },
            data: {
                signature: updatedProposal.signature,
                start_time: updatedProposal.start_time,
                end_time: updatedProposal.end_time,
                title: updatedProposal.title,
                description: updatedProposal.description
            }
        });

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteProposal(req: Request, res: Response) {
    const ipfsHash: string = req.params.ipfs_hash;
    const spaceName = req.query.spaceName as string;
    const message: string = req.query.message as string;
    const signature = req.query.signature as `0x${string}`;

    try {
        const currentProposal = await prisma.proposals.findUnique({ where: { ipfs_hash: ipfsHash } });

        if (!currentProposal) {
            return res.status(404).json({ error: "Proposal not found" });
        }

        if (currentProposal.is_web3) {
            const recoveredAddress = await verifyWalletSignature(message, signature);
            const isAuthorized = await checkSpaceAuthorization(prisma, spaceName, recoveredAddress);

            if (!isAuthorized) {
                return res.status(403).json({ error: "User is not authorized to delete a proposal in this space" });
            }
        }

        await unpinFromIpfs(ipfsHash);

        await prisma.proposals.delete({ where: { ipfs_hash: ipfsHash } });

        return res.json({ message: "Proposal deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting proposal", error });
    }
}
