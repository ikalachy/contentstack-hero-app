import React from "react";

export default function ErrorMessage({ title, message }: { title: string, message: string }) {
  return (
    <div className='error-page'>
      <div className='error-message'>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
