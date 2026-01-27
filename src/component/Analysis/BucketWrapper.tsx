import { useState } from 'react';
import BucketHeader from './BucketHeader';
import BucketContent from './BucketContent';

export default function BucketWrapper() {
  const [selectedBucket, setSelectedBucket] = useState<string>('');

  return (
    <>
      <BucketHeader selectedBucket={selectedBucket} setSelectedBucket={setSelectedBucket}/>
      <BucketContent selectedBucket={selectedBucket}/>
    </>
  )
}