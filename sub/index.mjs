import { useState } from 'react';

export function useOne() {
  const [one] = useState(1);
  return one;
}
