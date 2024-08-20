import {Component, ElementRef, ViewChild} from '@angular/core';
import {User} from "../../interfaces/user";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('searchList') searchList: ElementRef;
  user: User;
  list: any = [];
  constructor(private apiService: ApiService) {
  }
  ngOnInit() {
    this.apiService.user().subscribe((user: User) => {
      this.user = user;
    })
  }
  onTextareaFocus() {
    // console.log('#255 searchList is focused');
    this.showSearchSuggestionList();
  }
  onTextareaBlur(event: FocusEvent) {
    if (
      !this.searchList.nativeElement.contains(event.relatedTarget as Node) &&
      event.relatedTarget !== document.querySelector('.search-text-area')
    ) {
      this.hideSearchSuggestionList();
    }
  }
  showSearchSuggestionList() {
    this.searchList.nativeElement.style.display = 'block';
  }
  hideSearchSuggestionList() {
    this.searchList.nativeElement.style.display = 'none';
  }
  onInputChange(event?: any) {
    // console.log('#255 event', event);
    // this.searchText = $event.target.value;
    // this.getSearchSuggestionList($event);
  }
  onProductSelect(product: any) {
    // console.log('#255 product', product);
  }
}
