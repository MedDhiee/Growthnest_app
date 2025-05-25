import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/notification-display',
    title: 'Notification',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/Marketing/mailing',
    title: 'MailBox',
    icon: 'bi bi-mailbox',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Marketing/listOffres',
    title: 'Offers',
    icon: 'bi bi-card-text',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/Marketing/createOffre',
    title: 'Create Offer',
    icon: 'bi bi-bag-plus-fill',
    class: '',
    extralink: false,
    submenu: []
  }
];
