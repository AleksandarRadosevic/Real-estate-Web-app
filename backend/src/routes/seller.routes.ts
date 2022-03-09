import express from 'express';
import { SellerController } from '../controllers/seller.controller';

const SellerRouter = express.Router();

SellerRouter.route('/getAllEstates').post(
    (req,res)=>new SellerController().getAllEstates(req,res)
)
SellerRouter.route('/sellEstate').post(
    (req,res)=>new SellerController().sellEstate(req,res)
)
SellerRouter.route('/addEstate').post(
    (req,res)=>new SellerController().addEstate(req,res)
)
SellerRouter.route('/updateEstate').post(
    (req,res)=>new SellerController().updateEstate(req,res)
)
SellerRouter.route('/setPictures').post(
    (req,res)=>new SellerController().setPictures(req,res)
)
SellerRouter.route('/getLocation').post(
    (req,res)=>new SellerController().getLocation(req,res)
)
SellerRouter.route('/updateInfo').post(
    (req,res)=>new SellerController().updateInfo(req,res)
)
SellerRouter.route('/SellerSoldEstates').post(
    (req,res)=>new SellerController().SellerSoldEstates(req,res)
)
SellerRouter.route('/AgencySoldEstate').post(
    (req,res)=>new SellerController().AgencySoldEstate(req,res)
)
export default SellerRouter; 