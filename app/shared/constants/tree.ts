import type { TreeNode } from '@/shared/types/treeNode';

export const TREE_NODES: TreeNode[] = [
  {
    name: 'Pages',
    nodes: [{ name: '/' }, { name: 'About' }, { name: 'Settings' }],
  },
  {
    name: 'Auth',
    nodes: [{ name: 'Login' }, { name: 'SignUp' }],
  },
  {
    name: 'API',
    nodes: [
      {
        name: 'Examples',
        nodes: [{ name: 'Todos' }],
      },
    ],
  },
];
