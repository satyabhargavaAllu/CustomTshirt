import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoServiceService {
  // current unsaved state
  undoFrontSide= [];
  redoFrontSide = [];
  undoBackSide = [];
  redoBackSide = [];
  frontState: any;
  backState:any;
  constructor() { }

  getState(side) {  
    if (side) {  
    return this.frontState;
    }else{  
    return this.backState;
    }
  }

  save(canvasInstance, side) {
    let undo = side ? this.undoFrontSide : this.undoBackSide;
    let redo = side ? this.redoFrontSide : this.redoBackSide;
    redo = [];
    if (side) {
      if(this.frontState){
        undo.push(this.frontState);
      }
      this.frontState = JSON.stringify(canvasInstance);
    }else{
      if(this.backState){
        undo.push(this.backState);
      }
      this.backState = JSON.stringify(canvasInstance);
    }
  }

  replay(canvasInstance, side, type) {
    let undo = side ? this.undoFrontSide : this.undoBackSide;
    let redo = side ? this.redoFrontSide : this.redoBackSide;
    if (type === 'redo') {
      if(side){
      undo.push(this.frontState);
      this.frontState = redo.pop();
      }else{
      undo.push(this.backState);
      this.backState = redo.pop();
      }
    } else {
      if(side){       
      redo.push(this.frontState);
      this.frontState = undo.pop();
      }else{      
      redo.push(this.backState);
      this.backState = undo.pop();
      }
    }
  }

  reset(){
    this.undoFrontSide= [];
    this.redoFrontSide = [];
    this.undoBackSide = [];
    this.redoBackSide = [];
    this.frontState=undefined;
    this.backState=undefined;
  }
}

