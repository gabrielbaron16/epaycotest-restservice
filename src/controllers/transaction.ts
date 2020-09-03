import { Request, Response, NextFunction } from "express";
import { application } from "../constants/appVariable";
import { SuccessHandler } from "../handlers/successHandler";
import { createTransactionRequest } from "../soapRequests/createTransaction";
import { confirmTransactionRequest } from "../soapRequests/confirmTransaction";

export const createTransaction = async (req : Request , res : Response , next: NextFunction) => {
    try{
        const object : any = {
            document : req.body.document,
            phone : req.body.phone,
            value: req.body.value,
            auth_token: application.auth_token
        }
        const data =  await createTransactionRequest(object);
        SuccessHandler(201, data.message, res, next, {session_id : data.session_id});
    }catch (e){
        next(e);
    }
}

export const confirmTransaction = async (req : Request , res : Response , next: NextFunction) => {
    try{
        const object : any = {
            token : req.body.token,
            session_id : req.body.session_id,
            auth_token: application.auth_token
        }
        const data =  await confirmTransactionRequest(object);
        SuccessHandler(201, data.message, res, next, {message : data.message});
    }catch (e){
        next(e);
    }
}