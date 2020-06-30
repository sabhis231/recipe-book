import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Catgeory } from 'shared/model/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private dbFire: AngularFireDatabase) { }

  getCategories(): AngularFireList<Catgeory> {
    return this.dbFire.list('/categories/');
  }
}
