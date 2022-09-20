import React from 'react';
import './Skeleton.css';

type SkeletonElementProp = {
  type: string;
}

function SkeletonElement({ type }: SkeletonElementProp) {
  const classes = `skeleton ${type}`;

  return (
    // <section id="skeletonContainer">
      <div className={classes}></div>
    // </section>
  )
}

export default SkeletonElement