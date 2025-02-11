import { testController } from '@/controllers/testController';
import express from 'express'

const router = express.Router();
const testcontroller = new testController(); 

router.get('/',(req,res)=>{
    res.json('Hello world')
})
router.get('/data',testcontroller.increment);

export default router;