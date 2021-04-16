import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Subadmin = React.lazy(() => import('./views/Subadmin/subadmin'));
const Addsubadmin = React.lazy(() => import('./views/Subadmin/Addsubadmin'));
const Editsubadmin = React.lazy(() => import('./views/Subadmin/Editsubadmin'));

const Usermanager = React.lazy(() => import('./views/UserManager/Usermanager'));
const Addmanager = React.lazy(() => import('./views/UserManager/Addmanager'));
const Editmanager = React.lazy(() => import('./views/UserManager/Editmanager'));

const Categorylisting = React.lazy(() => import('./views/Category/Categorylisting'));
const Categoryadd = React.lazy(() => import('./views/Category/Categoryadd'));
const Categoryedit = React.lazy(() => import('./views/Category/Categoryedit'));


const Articlelisting = React.lazy(() => import('./views/Article/Articlelisting'));
const Articaladd = React.lazy(() => import('./views/Article/Articaladd'));
const Articaledit = React.lazy(() => import('./views/Article/Articaledit'));


const Profile = React.lazy(() => import('./views/Profile/Profile'));
const Settingmanager = React.lazy(() => import('./views/SettingManager/Settingmanager'));

const ContentManager = React.lazy(() => (import('./views/Content Manager/ContentManager')));
const AddContent = React.lazy(() => import('./views/Content Manager/Addcontent'));
const EditContent = React.lazy(() => import('./views/Content Manager/Editcontent'));

const Notification = React.lazy(() => import('./views/Notification Manager/NotificationList'));
const SmsNotification = React.lazy(() => import('./views/Notification Manager/SendSmsNotification'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/subadmin', name: 'Subadmin', component: Subadmin },
  { path: '/addsubadmin', name: 'Addsubadmin', component: Addsubadmin },
  { path: '/editsubadmin', name: 'Editsubadmin', component: Editsubadmin },

  { path: '/usermanager', name: 'User Manager', component: Usermanager },
  { path: '/addmanager', name: 'Add Manager', component: Addmanager },
  { path: '/editmanager', name: ' Edit Manager', component: Editmanager },
  { path: '/profile', name: 'Profile', component: Profile },

  { path: '/categorylisting', name: 'Category Manager', component: Categorylisting },
  { path: '/categoryadd', name: 'Add Category', component: Categoryadd },
  { path: '/categoryedit', name: ' Edit Category', component: Categoryedit },

  { path: '/articlelisting', name: 'Article Manager', component: Articlelisting },
  { path: '/articleadd', name: 'Add Article', component: Articaladd },
  { path: '/articleedit', name: ' Edit Article', component: Articaledit },

  { path: '/settingmanagers', name: 'Setting Manager', component: Settingmanager },

  { path: '/contentmanager', name: 'Content Manager', component: ContentManager },
  { path: '/addcontent', name: 'Add Content', component: AddContent },
  { path: '/editcontent', name: 'Edit Content', component: EditContent },

  { path: '/notification/notification-list', name: 'Notification List', component: Notification },
  { path: '/notification/sms-notification', name: 'Sms Notification', component: SmsNotification },

];

export default routes;
