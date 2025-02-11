import classNames from 'classnames/bind';
import { useState } from 'react';
import { NavLink } from 'react-router';
import styles from './folder.module.css';
import type { FolderProps } from './types';

function Folder({ node, className }: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isNotEmptyFolder = isOpen && (node.nodes?.length ?? 0) > 0;

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  const renderIcon = () => {
    return node?.nodes ? (
      isNotEmptyFolder ? (
        <span>📂&nbsp;</span>
      ) : (
        <span>📁&nbsp;</span>
      )
    ) : (
      <span>&nbsp;</span>
    );
  };

  const renderItemName = () => {
    return node?.nodes ? (
      node.name
    ) : (
      <NavLink to={`${node.name.toLowerCase()}`}>
        {node.name === '/' ? node.name.replace('/', 'Home') : node.name}
      </NavLink>
    );
  };
  const cx = classNames.bind(styles);
  const classes = cx(styles.menuItem, className);
  return (
    <li className={classes}>
      <span className={`${styles.menuTitle}`} onClick={clickHandler}>
        {renderIcon()}
        {renderItemName()}
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
