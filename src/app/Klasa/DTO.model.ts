
export class DTOModel{

  constructor( private id:number,
               private failureType:String,
               private name:String,
               private potentialCost:number,
               private potentialDate:Date,
               private status:String,
               private repairDescription:String,
  ) {
  }
}
