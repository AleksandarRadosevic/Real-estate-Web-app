import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const AdminRouter = express.Router();

AdminRouter.route('/getAllRequests').get(
    (req,res)=>new AdminController().getAllRequests(req,res)
)
AdminRouter.route('/getAllUsers').get(
    (req,res)=>new AdminController().getAllUsers(req,res)
)
AdminRouter.route('/acceptUser').post(
    (req,res)=>new AdminController().acceptUser(req,res)
)
AdminRouter.route('/denyUser').post(
    (req,res)=>new AdminController().denyUser(req,res)
)
AdminRouter.route('/deleteUser').post(
    (req,res)=>new AdminController().deleteUser(req,res)
)
AdminRouter.route('/updateUser').post(
    (req,res)=>new AdminController().updateUser(req,res)
)

AdminRouter.route('/registerUser').post(
    (req,res)=>new AdminController().registerUser(req,res)
)

AdminRouter.route('/getAllLocations').get(
    (req,res)=>new AdminController().getAllLocations(req,res)
)
AdminRouter.route('/getAgencies').get(
    (req,res)=>new AdminController().getAgencies(req,res)
)
AdminRouter.route('/addAgency').post(
    (req,res)=>new AdminController().addAgency(req,res)
)

AdminRouter.route('/addMicrolocation').post(
    (req,res)=>new AdminController().addMicrolocation(req,res)
)

AdminRouter.route('/deleteMicrolocation').post(
    (req,res)=>new AdminController().deleteMicrolocation(req,res)
)
AdminRouter.route('/addStreet').post(
    (req,res)=>new AdminController().addStreet(req,res)
)
AdminRouter.route('/deleteStreet').post(
    (req,res)=>new AdminController().deleteStreet(req,res)
)
export default AdminRouter; 