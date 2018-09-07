import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FABRIC_TOKEN } from '../common/services/fabric.service';
import { UndoRedoServiceService } from '../common/services/undo-redo-service.service';
import { faTrash, faUndo, faRedo, faImages, faFont } from '@fortawesome/free-solid-svg-icons';
import { LoadingIndicatorService } from '../common/services/loading-indicator.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DesignsService } from '../common/services/designs.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  canvasFront: any;
  canvasBack: any;
  Name: string;
  uploadedFile: any;
  selectedColor: any;
  tshirtSide: boolean = true;
  canvasSide: any;
  showSpinner: boolean = false;
  editDesign: any;
  faTrash = faTrash;
  faUndo = faUndo;
  faRedo = faRedo;
  faImages = faImages;
  faFont = faFont;
  constructor( @Inject(FABRIC_TOKEN) private fabric: any,
    private undoRedo: UndoRedoServiceService,
    private loadIndicator: LoadingIndicatorService,
    private route: ActivatedRoute,
    private designService: DesignsService,
    private routeInstance:Router) { }
  ngOnInit() {
    this.selectedColor = '#ffffff';
    this.canvasFront = new this.fabric.Canvas('frontEditor');
    this.canvasBack = new this.fabric.Canvas('backEditor');
    this.canvasSide = this.canvasFront;

    this.canvasFront.on('object:moving', (e) => {
      var obj = e.target;
      this.restrictElementsInBoundaries(obj);
    });
    this.canvasBack.on('object:moving', (e) => {
      var obj = e.target;
      this.restrictElementsInBoundaries(obj);
    });

    this.canvasFront.on('object:modified', (e) => {
      this.undoRedo.save(this.canvasFront, this.tshirtSide);
    });
    this.canvasBack.on('object:modified', (e) => {
      this.undoRedo.save(this.canvasBack, this.tshirtSide);
    });
    
    this.undoRedo.reset();
    this.editDesign = this.route.snapshot.data['editDesign'];
    if (this.editDesign && this.editDesign.length > 0) {
     // this.undoRedo.reset();
      this.canvasFront.clear();
      this.selectedColor = this.editDesign[0].color;
      this.canvasFront.loadFromJSON(JSON.parse(this.editDesign[0].frontCanvasDesign), () => {
        this.canvasFront.renderAll();
      });
      this.undoRedo.save(this.canvasFront, true);
      this.canvasBack.loadFromJSON(JSON.parse(this.editDesign[0].backCanvasDesign), () => {
        this.canvasBack.renderAll();
      });
      this.undoRedo.save(this.canvasBack, false);
    }
  }


  ngAfterContentInit() {
    this.disabletheCanvas(this.canvasBack, true);
  }


  restrictElementsInBoundaries(obj) {
    // if object is too big ignore
    if (obj.getScaledHeight() > obj.canvas.height || obj.getScaledWidth() > obj.canvas.width) {
      return;
    }
    obj.setCoords();
    // top-left  corner
    if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
      obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
      obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
    }
    // bot-right corner
    if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
      obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top);
      obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
    }
  }

  fileUpload(event: any, canvasInstance) {
    this.uploadedFile = event.target.value;
    var reader = new FileReader();
    reader.onload = (event) => {
      var img = new Image();
      img.onload = () => {
        var imgInstance = new this.fabric.Image(img, {
          scaleX: 0.2,
          scaleY: 0.2
        })
        canvasInstance.add(imgInstance);
      }
      img.src = reader.result;
      this.undoRedo.save(canvasInstance, this.tshirtSide);
    }
    reader.readAsDataURL(event.target.files[0]);
    event.target.value = '';
  }

  addText(canvasInstance) {
    canvasInstance.add(new this.fabric.IText('AddText', {
      fontFamily: 'calibri',
      fontSize: 14
    }));
    this.undoRedo.save(canvasInstance, this.tshirtSide);
  }

  removeSelectedElement(canvasInstance) {
    canvasInstance.remove(canvasInstance.getActiveObject());
  }

  checkSide(value: boolean) {
    this.canvasSide = value === true ? this.canvasFront : this.canvasBack;
    if (value) {
      this.disabletheCanvas(this.canvasBack, true);
      this.disabletheCanvas(this.canvasFront, false);
    } else {
      this.disabletheCanvas(this.canvasFront, true);
      this.disabletheCanvas(this.canvasBack, false);
    }
  }

  disabletheCanvas(canvasInstance, disable) {
    canvasInstance.selection = !disable;
    canvasInstance.discardActiveObject();
    canvasInstance.getObjects().forEach((o) => {
      o.lockMovementX = disable;
      o.lockMovementY = disable;
      o.lockScalingX = disable;
      o.lockScalingY = disable;
      o.lockUniScaling = disable;
      o.lockRotation = disable;
      o.selectable = !disable;
    })
    this.canvasBack.renderAll();
  }


  undo(canvasInstance, side) {
    this.undoRedo.replay(canvasInstance, side, 'undo');
    this.renderCanvas(canvasInstance, side);
  }


  redo(canvasInstance, side) {
    this.undoRedo.replay(canvasInstance, side, 'redo');
    this.renderCanvas(canvasInstance, side);
  }


  renderCanvas(canvasInstance, side) {
    canvasInstance.clear();
    canvasInstance.loadFromJSON(this.undoRedo.getState(side), () => {
      canvasInstance.renderAll();
    });
  }

  save() {
    this.showSpinner = this.loadIndicator.onRequestStart();
    let design = {
      color: this.selectedColor,
      imageUrl: this.canvasFront.toDataURL(),
      frontCanvasDesign: this.undoRedo.getState(true),
      backCanvasDesign: this.undoRedo.getState(false),
    }
    if (this.editDesign && this.editDesign.length > 0) {
      Object.assign(design, { id: this.editDesign[0].id });
    }
    this.designService.save(design).subscribe((data) => {
      this.showSpinner = this.loadIndicator.onRequestFinish();
      this.routeInstance.navigate(['mydesigns']);
    });
  }
}
