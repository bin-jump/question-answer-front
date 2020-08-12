import React, { useEffect } from 'react';
import { usePinUser } from './redux/hooks';

// this component will get the full user inforamtion
export default function PinUser(props) {
  const { pinUser } = usePinUser();

  useEffect(() => {
    pinUser();
  }, [pinUser]);

  return <div></div>;
}
