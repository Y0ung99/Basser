import React from 'react';
import DaumPostcode from 'react-daum-postcode';

//'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110 my-2 absolute right-2 top-32'
export default function Postcode({handlePostInput, handlePostIsOpen, receiver, sender}) {
  const completeHandler = (data) => {
    const {address, zonecode} = data;
    handlePostInput(address, zonecode)
  }
  const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE') {
      handlePostIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      handlePostIsOpen(false);
    }
  };
  return (
    <div>
      <DaumPostcode
      style={{
        position: 'absolute',
        top: '12rem',
        zIndex: '1',}}
      onComplete={completeHandler} 
      onClose={closeHandler}
      />
    </div>
  );
}

