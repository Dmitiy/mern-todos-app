interface INodeTree {
  name: string;
  nodes?: INodeTree[];
}

export type TreeNode = INodeTree;
