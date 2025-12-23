import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MileM } from "../models/mile-m";

export const mileSelector=createFeatureSelector<MileM[]>("miles")

export const selectMileByProName=(name:string)=>createSelector(
    mileSelector,
    (mile)=>mile.filter((m)=>m.projectId?.name===name)
)

export const selectMileByProId=(id:string)=>createSelector(
    mileSelector,
    (mile)=>mile.filter((m)=>m.projectId?._id===id)
)

export const selectMileById=(id:string)=>createSelector(
    mileSelector,
    (mile)=>mile.find((m)=>m._id===id)
)