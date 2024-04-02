interface INavMenuLinks {
  path: string;
  content: string;
}
// TODO: need to change path and import `PATH` into this component
export const navMenuLinks: INavMenuLinks[] = [
  {
    path: '/',
    content: 'home',
  },
  {
    path: '/payments',
    content: 'payments',
  },
  {
    path: '/transfers',
    content: 'transfers',
  },
  {
    path: '/history',
    content: 'history',
  },
];
