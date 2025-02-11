
import { EmailService } from '../services/emailService'; 
import { WorkerTask } from '@/types/worker.dto';


// Worker handles different task types
export default async function worker(task: WorkerTask) {
  switch(task.type) {
    case 'email':
      const emailService = new EmailService();
      return await emailService.sendPasswordReset(
        task.payload.email,
        task.payload.token
      );
      
    case 'ai':
      // Handle AI tasks
    //   return await processAITask(task.payload);
      
    case 'fileProcess':
      // Handle file processing
    //   return await processFile(task.payload);
  }
}