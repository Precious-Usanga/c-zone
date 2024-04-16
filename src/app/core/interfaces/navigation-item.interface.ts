import { Roles } from "@core/enum/role";


export type NavigationItem = NavigationLink ;

export interface NavigationLink {
  route: string;
  label: string;
  icon: string;
  routerLinkActiveOptions?: { exact: boolean };
  allowedRoles: Roles[];
}
