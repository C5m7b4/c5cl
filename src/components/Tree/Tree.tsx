// @ts-nocheck
import React, { useState } from 'react';
import { Icons } from '../Icons';

import './Tree.css';

const style = {
  height: '18px',
  width: '18px',
  transform: 'translateY(5px)',
  marginRight: '5px',
};

export interface TreeProps {
  json: object;
  style: React.CSSProperties;
}

const Tree = (props: TreeProps) => {
  const [openNodes, setOpenNodes] = useState<string>([]);

  const { folder: Folder, folderOpen: FolderOpen, file: File } = Icons;
  let nodeId = 0;

  const isPrimitive = (value: any) => {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    );
  };

  const isArray = (value: any) => Array.isArray(value);
  const isBoolean = (value: any) => typeof value === 'boolean';

  const processObject = (object: object) =>
    Object.keys(object).map((key, reactKey) => {
      nodeId++;
      return (
        <li
          key={key + reactKey}
          id={key + reactKey + nodeId}
          className="caret"
          onClick={(e) => toggleCaret(e)}
        >
          {openNodes.includes(key + reactKey + nodeId) ? (
            <FolderOpen theme="dark" type="dark" style={style} />
          ) : (
            <Folder theme="dark" type="dark" style={style} />
          )}
          {buildNode(key)}
          <ul className="nested">
            {isPrimitive(object[key])
              ? buildLeaf(object[key])
              : isArray(object[key])
              ? loopArray(object[key])
              : processObject(object[key])}
          </ul>
        </li>
      );
    });

  const buildNode = (key: string) => {
    return (
      <span className="node" onClick={(e) => toggle(e)}>
        {key}
      </span>
    );
  };

  const buildLeaf = (value: string) => {
    return (
      <li className="leaf" onClick={() => {}}>
        <File theme="dark" type="dark" style={style} />
        {isBoolean ? value.toString() : value}
      </li>
    );
  };

  const toggleCaret = (event: React.MouseEvent) => {
    try {
      event.target.querySelector('.nested').classList.toggle('active');
      event.target.classList.toggle('caret-down');
      if (openNodes.includes(event.target.id)) {
        const filteredNodes = openNodes.filter((n) => n !== event.target.id);
        setOpenNodes(filteredNodes);
      } else {
        setOpenNodes([...openNodes, event.target.id]);
      }
    } catch (error) {}
  };

  const toggle = (event: React.MouseEvent) => {
    try {
      event.target.parentElement
        .querySelector('.nested')
        .classList.toggle('active');
      event.target.parentElement.classList.toggle('caret-down');
      if (openNodes.includes(event.target.parentElement.id)) {
        const filteredNodes = openNodes.filter(
          (n) => n !== event.target.parentElement.id
        );
        setOpenNodes(filteredNodes);
      } else {
        setOpenNodes([...openNodes, event.target.parentElement.id]);
      }
    } catch (error) {}
  };

  const loopArray = (array: any) =>
    array.map((value: any, key: number) => (
      <div key={key}>
        {isPrimitive(value)
          ? buildLeaf(value)
          : isArray(value)
          ? loopArray(value)
          : processObject(value)}
      </div>
    ));

  return (
    <div className="mcl-treeview" style={props.style}>
      <ul id="c5UL">{processObject(props.json)}</ul>
    </div>
  );
};

export default Tree;
