import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileM } from "../models/profile";



export const profileSelecter=createFeatureSelector<ProfileM>('profile')

