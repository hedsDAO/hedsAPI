import { describe, expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../src/app';

describe('Tapes Router', () => {
  // Test data
  //   const testTapeData = {
  //     contract: 'test_contract',
  //     name: 'test_name',
  //     // ... other tape data
  //   };

  describe('GET /tape/:tapeId', () => {
    test('should return a tape by tapeId', async () => {
      const tapeId = 1;
      const response = await request(app).get(`/tapes/${tapeId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Good Society');
    });
  });

  //   describe('POST /tape', () => {
  //     test('should create a new tape', async () => {
  //       const response = await request(app).post('/tapes').send(testTapeData);

  //       expect(response.status).toBe(201);
  //       expect(response.body.name).toBe(testTapeData.name);
  //     });
  //   });

  //   describe('PUT /tape/:tape_id', () => {
  //     test('should update a tape by id', async () => {
  //       const tape_id = 1;
  //       const updatedData = { name: 'updated_name' };
  //       const response = await request(app).put(`/tapes/${tape_id}`).send(updatedData);

  //       expect(response.status).toBe(200);
  //       expect(response.body.name).toBe(updatedData.name);
  //     });
  //   });

  //   describe('DELETE /tape/:tape_id', () => {
  //     test('should delete a tape by id', async () => {
  //       const tape_id = 1;
  //       const response = await request(app).delete(`/tape/${tape_id}`);

  //       expect(response.status).toBe(200);
  //       expect(response.body.success).toBe(true);
  //     });
  //   });
});
