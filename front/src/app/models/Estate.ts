import { EstatePicture } from "./EstatePicture";
import { RealEstate } from "./RealEstate";

export class Estate{
    _id:string;
    Realestate:RealEstate;
    Advertiser:Array<any>;
    Pictures:string[];
}