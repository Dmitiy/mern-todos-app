import { useState } from 'react';
import type { TreeNode } from '@Types/treeNode';
import { NavLink } from 'react-router';

function Folder({ node }: { node: TreeNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const isNotEmptyFolder = isOpen && (node.nodes?.length ?? 0) > 0;

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <li>
      <span onClick={clickHandler} style={{ cursor: 'pointer' }}>
        {node?.nodes ? (
          isNotEmptyFolder ? (
            <span>📂&nbsp;</span>
          ) : (
            <span>📁&nbsp;</span>
          )
        ) : (
          <span>🔗&nbsp;</span>
        )}
        {node?.nodes ? (
          node.name
        ) : (
          <NavLink to={`${node.name.toLowerCase()}`}>
            {node.name === '/' ? node.name.replace('/', 'Home') : node.name}
          </NavLink>
        )}
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
