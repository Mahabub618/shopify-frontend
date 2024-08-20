import {Component, ElementRef, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {AuthService} from "../../public/services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('searchList') searchList: ElementRef;
  list: any = [];
  userName: string;
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.userName = this.authService.firstName;
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
  logout() {
    this.apiService.signOut().subscribe((data) => {
      this.authService.clearAll();
      this.router.navigate(['/login']);
    })
  }
}
