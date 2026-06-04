import employeeModel from "../models/Employee.js"
import bcrypt from "bcrypt"
import UserModel from "../models/User.js"

export const getEmployess=async(req,res)=>{
    try{
const {department}=req.query
const where={}
if(department) where.department=department
const employess = await employeeModel
  .find(where)
  .sort({ createdAt: -1 })
  .populate("userId", "email role")
  .lean();
const result=employess.map((emp)=>({
    ...emp,
    id:emp._id.toString(),
    user:emp.userId ?{email:emp.userId.email,role:emp.userId.role}:
    null

}))
return res.json(result)   
}catch(error){
    console.log(error)
return res.status(500).json({error:"failed to fetch employess"})

    }
}
export const createEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      basicSalary,
      allowances,
      deductions,
      joinDate,
      password,
      role,
      bio,
    } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      password: hashed,
      role: role || "EMPLOYEE",
    });

    const employee = await employeeModel.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: joinDate ? new Date(joinDate) : undefined,
      bio: bio || "",
    });

    return res.status(201).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Create employee error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        error: `Duplicate value found`,
        field: error.keyValue,
      });
    }

    return res.status(500).json({
      error: error.message,
    });
  }
};
export const updateEmployee=async(req,res)=>{
    try {
        const {id}=req.params;
        const {firstName,lastName,email,phone,position,department,
            basicSalary,allowances,deductions,password,role,bio,employmentStatus
        }=req.body
       
        const employee=await employeeModel.findById(id)
        if(!employee) return res.status(404).json({error:"Employee not found"})

       
     await employeeModel.findByIdAndUpdate(id,{
            
            firstName,
            lastName,
            email,
            phone,
            position,
            department:department ||"Engineering",
            basicSalary:Number(basicSalary) ||0,
           allowances:Number(allowances) ||0,
            deductions:Number(deductions) ||0,
            employmentStatus:employmentStatus ||"ACTIVE",
            bio:bio||"",

        })
const userUpdate={email}
if(role) userUpdate.role=role
if(password) userUpdate.password=await bcrypt.hash(password,10)

    await UserModel.findByIdAndUpdate(employee.userId,userUpdate)


        return res.json({success:true})
    } catch (error) {
        if(error.code===11000){
            return res.status(400).json({error:"email already exists"})
        }
      
        return res.status(500).json({error:"failed to update employee"})


    }
}

export const deleteEmployee=async(req,res)=>{
    try{
        const {id}=req.params;
        const employee=await employeeModel.findById(id)
        if(!employee) return res.status(404).json({error:
            "Employee not found"
        })
        employee.isDeleted=true
        employee.employmentStatus="INACTIVE"
        await employee.save()
        return res.json({success:true})


    }catch(error){
return res.status(500).json({error:"Failed to delete employee"})
    }
}