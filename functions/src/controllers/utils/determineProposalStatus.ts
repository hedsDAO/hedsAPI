import { ProposalState } from "hedsvote";

/**
 * Determines the status of a proposal based on its start and end time.
 *
 * @param {Date} startTime - The starting date/time of the proposal.
 * @param {Date} endTime - The ending date/time of the proposal.
 * @returns {ProposalState} - The status of the proposal (PENDING, OPEN, or CLOSED).
 */
export const determineProposalStatus = (startTime: Date, endTime: Date): ProposalState => {
    const currentTime = new Date();
  
    if (currentTime < startTime) {
      return ProposalState.PENDING;
    } else if (currentTime > endTime) {
      return ProposalState.CLOSED;
    } else {
      return ProposalState.OPEN;
    }
};
