import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import Reg_LoginRouter from './routes/register.routes';
import RegPicture from './models/registration_pictures';
import User from './models/user';
import Real_estateRoute from './routes/realestate.routes';
import AdminRouter from './routes/admin.routes';
import SellerRouter from './routes/seller.routes';
import { ObjectId } from 'bson';


const app = express();
const multer = require('multer');
app.use(express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/realestate');
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('db connection ok')
})

const router = express.Router();
const storage = multer.diskStorage({
    destination:(req: any,file: any,callBack: any)=>{
        callBack(null,'uploads/registration_pictures')
    },
    filename:(req: any,file: { originalname: any; },callBack: (arg0: any, arg1: string) => void)=>{
        callBack(null,`${new Date().getTime()}${file.originalname}`)}
});
const storageMultiple = multer.diskStorage({
    destination:(req: any,file: any,callBack: any)=>{
        callBack(null,'uploads/estate_pictures')
    },
    filename:(req: any,file: { originalname: any; },callBack: (arg0: any, arg1: string) => void)=>{
        callBack(null,`${new Date().getTime()}${file.originalname}`)}
});
var upload = multer({storage:storage});
var uploadMultiple = multer({storage:storageMultiple});
router.use('/user',Reg_LoginRouter);
router.use('/realestate',Real_estateRoute);
router.use('/admin',AdminRouter);
router.use('/seller',SellerRouter);
app.use('/', router);

interface MulterRequest extends Request {
    file: any;
}
interface MulterRequests extends Request {
    files: any;
    id:any;
}
app.post('/file',upload.single('file'),(req,res,next)=>{
    const file = (req as MulterRequest).file;
    let filename= (file.filename);
    
    User.findOne({},(err,user:any)=>{
        RegPicture.collection.insertOne({"filename":filename,"username":user['username']});
        if (!file){
            let error= new Error('Please upload file');
            return next(error);
        }
        res.send(file);
    }).sort({_id:-1}).limit(1);

});

app.post('/files',uploadMultiple.array('files'),(req,res,next)=>{
    let files = (req as MulterRequests).files;
    if (!files){
        res.json("Greska");
        return;
    }
    let arr: any[]=[];
    files.forEach((element:any) => {
        let filename= (element.filename);
        arr.push(filename);
    });
    res.json(arr);

});

app.listen(4000, () => console.log(`Express server running on port 4000`));
