import express from 'express';
import { Register_LoginController } from '../controllers/register_login.controller';

const Reg_LoginRouter = express.Router();

Reg_LoginRouter.route('/register').post(
    (req,res)=>new Register_LoginController().register(req,res)
)
Reg_LoginRouter.route('/login').post(
    (req,res)=>new Register_LoginController().login(req,res)
)
Reg_LoginRouter.route('/change_password').post(
    (req,res)=>new Register_LoginController().change_password(req,res)
)


Reg_LoginRouter.route('/get_all_agencies').get(
    (req,res)=>new Register_LoginController().get_all_agencies(req,res)
)
Reg_LoginRouter.route('/get_picture').get(
    (req,res)=>new Register_LoginController().get_picture_name(req,res)
)
export default Reg_LoginRouter; 