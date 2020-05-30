export class CovidMasterCategory {
    
    public status:string;
    public count:number;
    public increment:number;

    constructor( status:string, count:number, increment:number) {
        this.status=status;
        this.count=count;
        this.increment=increment;
    }

}