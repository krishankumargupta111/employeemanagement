import mongoose from "mongoose";
import { DEPARTMENTS } from "../constants/depatments.js";
const employeeSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel",
        required:true,unique:true},
        firstName:{type:String,required:true},
          lastName:{type:String,required:true},
           email:{type:String,required:true},
              phone:{type:String,required:true},
                position:{type:String,required:true},
                  basicSalary:{type:Number,required:true},
                   allowances:{type:Number,required:true},
                    deductions:{type:String,required:true},
                     employmentStatus:{type:String,enum:["ACTIVE","INACTIVE"],
                        default:"ACTIVE"},
                       joinDate:{type:Date,required:true},
                       isDeleted:{type:Boolean,default:false},
                       bio:{type:String,default:""},
                       department:{type:String,enum:DEPARTMENTS}



 

},{timestamps: true})
const employeeModel=mongoose.model("employeeModel",employeeSchema)
export default employeeModel