import type { TreeNode } from '@/shared/types/treeNode';

export const TREE_NODES: TreeNode[] = [
  {
    name: 'Pages',
    nodes: [{ name: '/' }, { name: 'About' }, { name: 'Settings' }],
  },
  {
    name: 'Auth',
    nodes: [{ name: 'Login' }, { name: 'Signup' }],
  },
  {
    name: 'API',
    nodes: [
      {
        name: 'Examples',
        nodes: [{ name: 'Todos' }],
      },
      {
        name: 'External',
        nodes: [
          {
            name: 'Countries',
          },
        ],
      },
      // {
      //   name: 'Pictures',
      //   nodes: [
      //     {
      //       name: 'Animals',
      //       nodes: [
      //         { name: 'Dogs', nodes: [] },
      //         { name: 'Cats', nodes: [] },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name: 'file.txt',
      // },
    ],
  },
];
