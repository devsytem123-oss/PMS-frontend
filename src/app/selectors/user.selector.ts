import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../models/user";



export const selectUsers=createFeatureSelector<User[]>('users')

export const selectUserByRole=createSelector(
    selectUsers,
    (user)=>user.filter(u=>u.role==='Project Manager')
)

export const selectUserByRoleEmp=createSelector(
    selectUsers,
    (user)=>user.filter(u=>u.role==='Employee')
)

export const selectUserById=(id:string)=>createSelector(
    selectUsers,
    (user)=>user.find(u=>u._id===id)
)