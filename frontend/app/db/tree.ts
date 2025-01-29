import type { TreeNode } from '@Types/treeNode';

export const TREE_NODES: TreeNode[] = [
  {
    name: 'Home',
    nodes: [
      { name: 'About', nodes: [] },
      { name: 'Popular', nodes: [] },
      {
        name: 'Music',
        nodes: [
          {
            name: 'Rock',
            nodes: [
              {
                name: 'ACDC-1.mp3',
              },
              {
                name: 'ACDC-2.mp3',
              },
            ],
          },
          { name: 'Classical', nodes: [] },
        ],
      },
      {
        name: 'Documents',
        nodes: [
          {
            name: 'Pictures',
            nodes: [
              { name: 'Dogs', nodes: [] },
              { name: 'Cats', nodes: [] },
            ],
          },
        ],
      },
      {
        name: 'file.txt',
      },
    ],
  },
];
