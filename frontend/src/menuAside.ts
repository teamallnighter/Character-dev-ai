import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/characters/characters-list',
    label: 'Characters',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiRobot ? icon.mdiRobot : icon.mdiTable,
    permissions: 'READ_CHARACTERS',
  },
  {
    href: '/scenarios/scenarios-list',
    label: 'Scenarios',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiScriptText ? icon.mdiScriptText : icon.mdiTable,
    permissions: 'READ_SCENARIOS',
  },
  {
    href: '/traits/traits-list',
    label: 'Traits',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFormatListBulleted
      ? icon.mdiFormatListBulleted
      : icon.mdiTable,
    permissions: 'READ_TRAITS',
  },
  {
    href: '/versions/versions-list',
    label: 'Versions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiHistory ? icon.mdiHistory : icon.mdiTable,
    permissions: 'READ_VERSIONS',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/about',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
