export type WorkerTask = {
    type: 'email' | 'ai' | 'fileProcess';
    payload: any;
  }