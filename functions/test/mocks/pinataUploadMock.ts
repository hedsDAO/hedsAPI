import { jest } from '@jest/globals';

const fileRequest = { params: { wallet: '0x000000', space: 'test', tape: 'test', id: 'test' } } as unknown as Request;
const fileResponse = {
  locals: { imageUrl: 'https://avatars.githubusercontent.com/u/98577422?s=200&v=4', subId: 'test' },
  body: {},
  statusCode: 0,
  status: jest.fn(),
} as unknown as Response;

export { fileRequest, fileResponse };
