import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {DesignsService} from '../common/services/designs.service';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class CurrentDesignResolver implements Resolve<any>{  
    constructor(private designService:DesignsService){}
    resolve( route:ActivatedRouteSnapshot) {  
         return this.designService.getDesignByID(+route['_routerState'].url.split('/')[2])
    }    
}


