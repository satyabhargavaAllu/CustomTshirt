import { Injectable } from '@angular/core';

@Injectable()
export class LoadingIndicatorService {
  private _loading: boolean = false;

  constructor() { }

  onRequestStart(): boolean {
    return !this._loading;
  }

  onRequestFinish(): boolean {
   return  this._loading ;
  }
}
