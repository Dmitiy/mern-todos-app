import { TREE_NODES } from '@db/tree';
import Folder from '@components/folder';

function Aside() {
  return (
    <div>
      <ul>
        {TREE_NODES.map((node) => (
          <Folder node={node} key={node.name} />
        ))}
      </ul>
    </div>
  );
}

export default Aside;
