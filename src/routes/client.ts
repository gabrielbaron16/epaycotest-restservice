import { Router } from "express"

import { joiValidator } from '../validators/joi';
import { createClientSchema, getBalanceSchema, rechargeWalletSchema } from "../validators/joiClient";
import { createClient, rechargeWallet, getBalance } from '../controllers/client';


const router = Router();

router.post('/', [joiValidator(createClientSchema)], createClient);
router.post('/wallet', [joiValidator(rechargeWalletSchema)], rechargeWallet);
router.post('/balance' , [joiValidator(getBalanceSchema)], getBalance);

export default router;