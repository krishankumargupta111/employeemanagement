import {Router} from 'express'
import { createEmployee, deleteEmployee, getEmployess, updateEmployee } from '../controllers/employee.controller.js'
import { protect,protectAdmin } from "../middleware/auth.js";

const employeesRouter=Router()
employeesRouter.get("/",protect,protectAdmin,getEmployess)
employeesRouter.post("/",protect,protectAdmin,createEmployee)
employeesRouter.put("/:id",protect,protectAdmin,updateEmployee)
employeesRouter.delete("/:id",protect,protectAdmin,deleteEmployee)
export default employeesRouter