import { VoteMethod } from "hedsvote";

/**
 * Converts the given vote method enumeration to its string representation.
 * 
 * @param {VoteMethod} method - The vote method enumeration value.
 * @returns {string} The string representation of the given vote method.
 * @throws {Error} Throws an error if the given vote method enumeration is not supported.
 */
export const voteMethodEnumToString = (method: VoteMethod): string => {
    switch (method) {
    case VoteMethod.QUADRATIC:
      return "quadratic";
    case VoteMethod.SINGLE_CHOICE:
      return "single choice";
    default:
      throw new Error("Invalid vote method enum value");
    }
};
