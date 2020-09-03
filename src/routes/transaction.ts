import { Router } from "express";
import { joiValidator } from "../validators/joi";
import { createTransactionSchema, confirmTransactionSchema } from "../validators/joiTransaction"
import { createTransaction, confirmTransaction } from "../controllers/transaction";


const router = Router();

router.post('/' , [joiValidator(createTransactionSchema)], createTransaction);
router.put('/confirm' , [joiValidator(confirmTransactionSchema)], confirmTransaction);

export default router;