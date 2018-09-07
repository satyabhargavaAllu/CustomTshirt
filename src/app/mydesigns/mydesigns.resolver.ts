import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {DesignsService} from '../common/services/designs.service';

@Injectable()
export class MyDesignsResolver implements Resolve<any>{    
    constructor(private designService:DesignsService){}
    resolve(){
        return this.designService.getAllDesigns();
    }    
}


