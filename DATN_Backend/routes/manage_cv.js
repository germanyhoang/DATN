import { Router } from "express";

import {  
    duyet, 
    getCvsByPostId, 
    getPostByCV, 
    list, 
    read, 
    remove, 
    removeCvByUser, 
    tuchoi, 
    applyCv, 
    setIsNew,
    getProposeCandidates,
    getCvByPostId,
} from "../controllers/manage_cv";

// Multer config
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/cvs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

const router = Router();

router.get('/cvs', list);
router.get('/cvs/:id/detail', read);
router.put('/cvs/:id/duyet', duyet);
router.put('/cvs/:id/tuchoi', tuchoi);
router.get('/cvs/:postId', getCvsByPostId);
router.get('/cvs/:postId/:email', getCvByPostId)
router.post('/cvs/apply',upload.single('file') , applyCv);
router.delete('/cvs/:id', remove);
router.get('/user-cvs/:id', getPostByCV);
router.delete('/user-cvs', removeCvByUser);
router.post('/cvs/set', setIsNew)
router.get('/get-propose-candidates',getProposeCandidates);
export default router;