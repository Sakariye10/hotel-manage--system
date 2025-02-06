import  jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'


interface UserData {
    U_Id : number
    Fullname : string,
    Email : string,
    Role : string
}

export const generateToken = (User : UserData) => {
    const Payload = User;
    return jwt.sign(Payload , " SAKARIA_1456" , {   
        expiresIn : "1h"
    })
}

export interface customUserRequest extends Request {
    User : UserData
}

export const decodeToken = (
    req : customUserRequest,
    res : Response,
    next : NextFunction
) => {
    try {

        const Token = 
        req.headers.authorization?.startsWith('Bearer') &&
        req.headers.authorization?.split(' ')[1];

        // console.log(Token)
        
        if(!Token){
            return res.json({
                IsSuccess : false,
                message : 'UnAuthorized'.toUpperCase()
            })
        }
      
        const decode: UserData | any = jwt.verify(Token, "SAKARIA_1456");

        req.User = { ...decode };
        next();
     
    } catch (error) {
        console.log(error)
        return res.json({
            IsSuccess : false,
            message : ' Something Went Wrong Please Try Again Later !!'.toUpperCase()
        })
    }
}