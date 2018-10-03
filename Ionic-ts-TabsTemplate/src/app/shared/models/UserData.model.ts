


//import { HealthData } from "./HealthData.model",
//import { Injectable } from '@angular/core',

//@Injectable()
export class UserData {
  constructor(
    public Id: number,
    public Text: string,
    public Complete: string,
    public Version: string,
    public CreatedAt: string,
    public UpdatedAt: string,
    public Deleted: string,
    public Heartrate: string,
    public HeartrateComment: string,
    public Weight: string,
    public WeightComment: string,
    public Length: string,
    public LengthComment: string,
    public WellBeing: string,
    public WellBeingComment: string,
    public Notes: string,
    public BreathFrequency: string,
    public BreathFrequencyComment: string,
    public EKG: string,
    public FluidBody: string,
    public FluidLungs: string,
    public BloodPressure: string,
    public BloodOxygen: string
  ) { }
}


//export class UserData {
//  Id: string,
//  Text: string,
//  Complete: string,
//  Version: string,
//  CreatedAt: string,
//  UpdatedAt: string,
//  Deleted: string,
//  HealthData: HealthData,
//}
