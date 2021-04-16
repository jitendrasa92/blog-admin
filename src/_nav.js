export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Subadmin',
      url: '/subadmin',
      icon: 'nav-icon fa fa-users',
    },
    {
      permission: 1,
      name: 'User Manager',
      url: '/usermanager',
      icon: 'nav-icon fa fa-user-plus',
    },
    {
      name: 'Category',
      url: '/categorylisting',
      icon: 'nav-icon fa fa-align-justify',
    },
    {
      name: 'Article',
      url: '/articlelisting',
      icon: 'nav-icon fa fa-book',
    },
    {
      permission: 2,
      name: 'Content Manager',
      url: '/contentmanager',
      icon: 'nav-icon fa fa-text-width',
    },
    {
      permission: 3,
      name: 'Notification',
      url: '/notification',
      icon: 'fa fa-bell',
      children: [
        {
          name: 'Notification',
          url: '/notification/notification-list',
          icon: 'nav-icon fa fa-bell-o',
        },
        // {
        //   name: 'SMS Notification',
        //   url: '/notification/sms-notification',
        //   icon: 'nav-icon fa fa-commenting',
        // },
      ],
    },
    {
      permission: 4,
      name: 'Setting Manager',
      url: '/settingmanagers',
      icon: 'nav-icon fa fa-wrench',
    }
  ],
};