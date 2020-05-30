import { CovidDelta } from './covid-delta.model';

export class CovidDistrictData {

    // public notes:string;
    // public active: number
    // public confirmed: number;
    // public deceased: number;
    // public recovered: number;
    // public delta: {};
    
    constructor( 
        public notes:string,
        public active: number,
        public confirmed: number,
        public deceased: number,
        public recovered: number,
        public delta: CovidDelta) {

    }
}