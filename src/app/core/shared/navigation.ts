import { Roles } from "@core/enum/role";
import { NavigationItem } from "@core/interfaces/navigation-item.interface";


export const NavigationList: NavigationItem[] = [
  {
    label: 'Countries',
    route: '/admin/countries',
    icon: 'flag',
    allowedRoles: [Roles.ADMIN, Roles.OPERATOR]
  },
  {
    label: 'Continents',
    route: '/admin/continents',
    icon: 'public',
    allowedRoles: [Roles.ADMIN]
  }
];
