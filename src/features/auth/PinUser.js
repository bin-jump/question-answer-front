import React, { useEffect } from 'react';
import { usePinUser } from './redux/hooks';

export default function PinUser(props) {
  const { pinUser } = usePinUser();

  useEffect(() => {
    pinUser();
  }, [pinUser]);

  return <div></div>;
}
