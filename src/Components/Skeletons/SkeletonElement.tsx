import React from 'react';
import './Skeleton.css';

type SkeletonElementProp = {
  type: string;
}

function SkeletonElement({ type }: SkeletonElementProp) {
  const classes = `skeleton ${type}`;

  return (
    <div className={classes}></div>
  )
}

export default SkeletonElement