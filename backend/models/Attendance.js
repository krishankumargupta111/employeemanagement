import mongoose from "mongoose";
const attendanceSchema=new mongoose.Schema({
   employeeId:{type:mongoose.Schema.Types.ObjectId,required:true,
    ref:'employeeModel',
    unique:true
   },
   date:{type:Date,required:true},
   checkIn:{type:Date,default:null},
   checkOut:{type:Date,default:null},
   status:{type:String,enum:['PRESENT','ABSENT','LATE'],
    default:'PRESENT'
   },
   workingHours:{type:Number,default:null},
   dayType:{type:String,enum:['FULL DAY','Three Quarter Day',
    'Half Day','Short Day',null],default:null}



},{timestamps: true})
attendanceSchema.index({employeeId:1,date:1},{unique:true})
const AttendanceModal=mongoose.model("AttendanceModal",attendanceSchema)
export default AttendanceModal