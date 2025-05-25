import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
import { Message, NotificationService } from '../../services/GestionMarketingServices/NotificationService.service';  

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  unreadCount: number = 0;
  notifications: any[] = [];
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    const currentUserData = localStorage.getItem('auth_user') || '';
    const currentUser = JSON.parse(currentUserData);
    const userEmail = currentUser.email;
    this.notificationService.fetchStoredNotifications(userEmail).subscribe(data => {
      this.notifications = data;
      this.unreadCount = data.filter(msg => !msg.read).length;
    });
  
    this.notificationService.getMessages().subscribe((msg: Message) => {
      this.notifications.unshift(msg);
      this.unreadCount++; // Nouveau message = +1 non lu
    });
  }
  
}
