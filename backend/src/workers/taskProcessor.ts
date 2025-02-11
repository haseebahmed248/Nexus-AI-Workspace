import Piscina from 'piscina';
import path from 'path';

export const pool = new Piscina({
  filename: path.resolve(__dirname, '../../dist/workers/worker.js'),
  minThreads: 4,
  maxThreads: 8
});
