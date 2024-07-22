import React from 'react';

export default function UserMessage ( {messageReal} ) {
  const message = messageReal;

  if (!messageReal){
    return null;
  }

  return (
    <>
        <div className='titleblock'>
            <h3 className='fw-bold ps-2 pt-2'>
                {/* {message.anonymous ? "Anonymous" : message.userId.name} (${message.amount}) */}
                {message.anonymous ? "Anonymous" : message.userId.firstName} ({message.amount} ZAR)
            </h3>
            <p className='truncated-text ms-4 mb-0' style={{ lineHeight: "25px"}}>
                "{message.message}"
            </p>
        </div>

    
    </>
  );
};