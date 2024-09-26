import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User,UserDocument } from "./user.schema";


@Injectable()

export class UserService{

    constructor (@InjectModel (User.name) private userMoldel : Model<UserDocument> ){}

    async create(username:string,email:string,password:string):Promise<User>{
        const newUser = new this.userMoldel({username})
    }

}