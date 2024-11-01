import { Router } from 'express'
import {
    createCandidate,
    getCandidate,
    getCandidates,
    getCandidatesByUId,
    removeCandidate,
} from '../../controllers/employer/candidate';

const router = new Router();

router.get('/candidates/:userId/list', getCandidatesByUId)
router.get('/candidates/', getCandidates)
router.get('/candidates/:id/', getCandidate)
router.post('/candidates', createCandidate)
router.delete('/candidates/:id', removeCandidate)

export default router