import mongoose from "mongoose";
const payslipSchema=new mongoose.Schema({
   employeeId:{type:mongoose.Schema.Types.ObjectId,required:true,
    ref:'employeeModel',
    unique:true
   },
   month:{type:Number,required:true},
   year:{type:Number,required:true},
   basicSalary:{type:Number,required:true},
   allowances:{type:Number,default:0},
   deductions:{type:Number,default:0},
   netSalary:{type:Number,required:true},




},{timestamps: true})

const PayslipModel=mongoose.model("PayslipModel",payslipSchema)
export default PayslipModel