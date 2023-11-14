import { Request, Response, NextFunction } from "express";  
import { validationResult } from "express-validator";

//esse é middleware coringa pra trabalhar com qualquer validação do nosso sistema  vai ficar responsavel por verificar os dados da req e permitir ou não que esses dados prossiga com o caminho 
export const validate = (req: Request, res: Response, next: NextFunction)=>{
    //recuperar todos os erros da req
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();    
    }

    const extratectErrors: object[] = [];

    errors.array().map((err) => extratectErrors.push({[err.type]: err.msg}))

    return res.status(422).json({
        errors: extratectErrors,
    })
}