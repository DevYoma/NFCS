import React from 'react'
import SkeletonElement from './SkeletonElement'

const SkeletonUserLoading = () => {
  return (
    <div> 
        <SkeletonElement type='title' />
        <SkeletonElement type='text' />
        <SkeletonElement type='avatar' />
        <SkeletonElement type='text' />
    </div>
  )
}

export default SkeletonUserLoading