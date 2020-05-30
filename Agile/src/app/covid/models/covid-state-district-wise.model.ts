import { CovidDistrictData } from './covid-district-data.model';

export class CovidStateDistrictWise {
    
    public statecode: string;
    public districtData: number;
    
    constructor(districtData:number, statecode:string) {
        this.districtData=districtData;
        this.statecode=statecode;
    }
    
}