import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { GallerieService } from '../common/gallerie.service';
import { Product } from '../models/product';
import { LoggingService } from '../common/logging.service';

@Component({
  selector: 'app-produit-admin',
  templateUrl: './produit-admin.component.html',
  styleUrls: ['./produit-admin.component.css']
})
export class ProduitAdminComponent implements OnInit {
  products: Product[];
  page = 1;
  closeResult: string;
  adminLogged: boolean;

  constructor(private serviceAdmin: GallerieService, private modalService: NgbModal, private loggingService: LoggingService) {
    const product = new Product();
  }


  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
    .then(result => {
      this.delete(id);
    }).catch(reason => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  ngOnInit() {
    this.products = this.serviceAdmin.get();
    this.adminLogged = this.loggingService.getLogStatus();
  }


  delete(id) {
    this.serviceAdmin.delete(id);
  }
}
