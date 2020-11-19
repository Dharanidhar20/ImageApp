import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageList: any;
  modalContent: any;
  closeResult: string;

  constructor(private imageService: ImageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.imageList = [];
    this.getAllImageList();
  }

  getAllImageList() {
    this.imageService.getAllImages().subscribe(resp => {
      this.imageList = resp;
    }, error => {
      console.error(error);
      window.scroll(0, 0);
    });
  }

  open(data, content) {
    this.modalContent = data;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
