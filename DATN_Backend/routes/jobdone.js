import { Router } from "express";
import { addJobdone, getJobdoneByUserId, remove } from "../controllers/jobdone";

const router = Router()

router.get('/jobdone/:userId', getJobdoneByUserId)
router.post('/jobdone', addJobdone)
router.delete('/jobdone/:id', remove)
export default router
// import { Router } from "express";
// import { addJobDone, getJobDone, getJobDones, removeJobDone } from "../controllers/jobdone";

// const router = Router();

// router.get('/jobdones', getJobDones);
// router.delete('/jobdones/:id', removeJobDone);
// router.get('/jobdones/:id', getJobDone);
// router.post('/jobdones', addJobDone);

// export default router;
