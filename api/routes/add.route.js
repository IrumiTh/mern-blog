import express from 'express';
import {verifyToken} from '../utiles/verifyUser.js'
import { create, deleteadd, getAdds, getLastAdd, updateadd } from '../controllers/add.controller.js';
import { updatepost } from '../controllers/post.controller.js';


const router = express.Router();
router.post('/create',verifyToken, create)
router.get('/getlast',getLastAdd);
router.get('/getadds',verifyToken,getAdds);
router.delete('/deleteadd/:addId/:userId',verifyToken,deleteadd)
router.put('/updateadd/:addId/:userId',verifyToken,updateadd)
export default router;