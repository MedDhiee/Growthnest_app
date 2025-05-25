import { Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { NotificationDisplayComponent } from './notification-display/notification-display.component';


export const ComponentsRoutes: Routes = [
	{
		
		path: '',
		children: [
			
			{
				path: 'notification',
				component: NotificationComponent
			},
			{
				path: 'notification-display',
				component: NotificationDisplayComponent
			}
		]
	},

];
