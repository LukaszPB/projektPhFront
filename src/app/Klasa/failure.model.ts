
export class Failure{

  constructor( private _id:number,
               private _failureType:String,
               private _name:String,
               private _date:Date,
               private _potentialCost:number,
               private _potentialDate:Date,
               private _status:String,
               private _repairDescription:String,
  ) {
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get failureType(): String {
    return this._failureType;
  }

  set failureType(value: String) {
    this._failureType = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get potentialCost(): number {
    return this._potentialCost;
  }

  set potentialCost(value: number) {
    this._potentialCost = value;
  }

  get potentialDate(): Date {
    return this._potentialDate;
  }

  set potentialDate(value: Date) {
    this._potentialDate = value;
  }

  get status(): String {
    return this._status;
  }

  set status(value: String) {
    this._status = value;
  }

  get repairDescription(): String {
    return this._repairDescription;
  }

  set repairDescription(value: String) {
    this._repairDescription = value;
  }
}
