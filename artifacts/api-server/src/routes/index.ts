import { Router, type IRouter } from "express";
import healthRouter from "./health";
import toolsRouter from "./tools";
import reviewsRouter from "./reviews";

const router: IRouter = Router();

router.use(healthRouter);
router.use(toolsRouter);
router.use(reviewsRouter);

export default router;
