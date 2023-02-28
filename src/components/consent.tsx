import React from 'react';
import parse from 'html-react-parser';


const Consent = ({ consent }: { consent?: string }) => {

  return (
    <div className='text-field' style={{ order: 1 }}>
      <div className='consent'>
        {consent && parse(consent)}
      </div>
    </div>

  );
};

export const renderConsent = (consent: string) => <Consent consent={consent} />

export default Consent;
