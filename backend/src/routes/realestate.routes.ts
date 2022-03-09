import express from 'express';
import { Register_LoginController } from '../controllers/register_login.controller';
import { Realestate_Controller } from '../controllers/realestate.controller';

const Real_estateRoute = express.Router();

Real_estateRoute.route('/getAll').get(
    (req,res)=>new Realestate_Controller().getAll(req,res)
)
Real_estateRoute.route('/getBasicResults').post(
    (req,res)=>new Realestate_Controller().getBasicResults(req,res)
)

Real_estateRoute.route('/getAdvancedResults').post(
    (req,res)=>new Realestate_Controller().getAdvancedResults(req,res)
)

Real_estateRoute.route('/getAveragePriceM2').post(
    (req,res)=>new Realestate_Controller().getAveragePriceM2(req,res)
)

Real_estateRoute.route('/getEstatesById').get(
    (req,res)=>new Realestate_Controller().getEstatesById(req,res)
)

Real_estateRoute.route('/getEstateId').get(
    (req,res)=>new Realestate_Controller().getEstateId(req,res)
)

Real_estateRoute.route('/getUserFavorites').get(
    (req,res)=>new Realestate_Controller().getUserFavorites(req,res)
)

Real_estateRoute.route('/addToFavorites').post(
    (req,res)=>new Realestate_Controller().addToFavorites(req,res)
)
Real_estateRoute.route('/dropFromFavorites').post(
    (req,res)=>new Realestate_Controller().dropFromFavorites(req,res)
)

export default Real_estateRoute; 