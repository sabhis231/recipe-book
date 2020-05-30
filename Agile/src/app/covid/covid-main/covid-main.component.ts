import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as CovidActions from '../store/action/covid.actions';
import { HttpClient } from '@angular/common/http';
import { CovidStateDistrictWise } from '../models/covid-state-district-wise.model';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-covid-main',
  templateUrl: './covid-main.component.html',
  styleUrls: ['./covid-main.component.css']
})
export class CovidMainComponent implements OnInit {
  masterCategory:[];
  constructor(private store: Store<fromApp.AppState>, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.store.dispatch(new CovidActions.GetStateDistrictWiseData());
    this.store.select('covid').pipe(
      map(covidState=>{
        console.log("dataa");
        console.log(covidState);
        return covidState.covidStateDistrictWise;
      }),
      map(covidStateDistrictWise=>{
      console.log(covidStateDistrictWise);
      })
    )

    console.log(this.store.select('covid'));

    // console.log(this.http.get<CovidStateDistrictWise[]>('https://api.covid19india.org/state_district_wise.json'));
  }
  masterInputType:string = 'Type Something';

  // masterCategory=[{
  //   status:"confirmed",
  //   count:10000,
  //   increment:10
  // }, {
  //   status:"Active",
  //   count:8000,
  //   increment:10
  // },{
  //   status:"recovered",
  //   count:15000,
  //   increment:5
  // },{
  //   status:"Deceased",
  //   count:2000,
  //   increment:4
  // }]

}
