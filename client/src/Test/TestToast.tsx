import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

const TestToast = () => {
//   const notify = () => toast('Hello World!');
  const notify = () => toast.error('Hello World!');

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      {/* <Toaster /> */}
    </div>
  );
}

export default TestToast;