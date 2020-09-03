import { Request, Response, NextFunction } from "express";
import { application } from "../constants/appVariable";
import { ErrorHandler } from "../handlers/errorHandler";
import { SuccessHandler } from "../handlers/successHandler";
import  { createClientRequest } from "../soapRequests/createClient";
import  { rechargeWalletRequest } from "../soapRequests/rechargeWallet";
import  { getBalanceRequest } from "../soapRequests/getBalance";

  export const createClient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const client : any = {
        document : req.body.document,
        name : req.body.name,
        lastName : req.body.lastName,
        email : req.body.email,
        phone : req.body.phone,
        auth_token: application.auth_token
      }  
      const data = await createClientRequest(client);
      SuccessHandler(201, data.message, res, next, data.cli);
    } catch (e) {
      next(new ErrorHandler(500, e.message));
    }
  };
  
  export const rechargeWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const object : any = {
        document : req.body.document,
        phone : req.body.phone,
        value : req.body.value,
        auth_token: application.auth_token
      };
      const data = await rechargeWalletRequest(object);
      SuccessHandler(201, data.message, res, next, { balance: data.balance });
    } catch (e) {
      next(e);
    }
  };
  
  export const getBalance = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const object : any = {
            document : req.body.document,
            phone : req.body.phone,
            auth_token: application.auth_token
          };  
      const data = await getBalanceRequest(object);
      SuccessHandler(201, data.message, res, next, { balance: data.balance });
    } catch (e) {
      next(e);
    }
  };