import { useState } from 'react';
import type { TreeNode } from '@Types/treeNode';

function Folder({ node }: { node: TreeNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isNotEmptyFolder = isOpen && (node.nodes?.length ?? 0) > 0;

  return (
    <li>
      <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
        {node?.nodes ? (
          isNotEmptyFolder ? (
            <span>📂&nbsp;</span>
          ) : (
            <span>📁&nbsp;</span>
          )
        ) : (
          <span>📎&nbsp;</span>
        )}
        {node.name}
      </span>
      {isOpen && (
        <ul>
          {node.nodes?.map((f) => (
            <Folder node={f} key={f.name} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Folder;
