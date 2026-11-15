import React from 'react';
import { QRType, QRInputs } from '../../types/qr.types';
import { UrlForm } from './forms/UrlForm';
import { WifiForm } from './forms/WifiForm';
import { VCardForm } from './forms/VCardForm';
import { TextForm } from './forms/TextForm';
import { EmailForm } from './forms/EmailForm';
import { SmsForm } from './forms/SmsForm';
import { EventForm } from './forms/EventForm';

interface ActiveTypeFormProps {
  type: QRType;
  inputs: QRInputs;
  onChangeInputs: (inputs: QRInputs) => void;
}

export const ActiveTypeForm: React.FC<ActiveTypeFormProps> = ({
  type,
  inputs,
  onChangeInputs,
}) => {
  switch (type) {
    case 'url':
      return (
        <UrlForm
          value={inputs.url}
          onChange={(url) => onChangeInputs({ ...inputs, url })}
        />
      );
    case 'wifi':
      return (
        <WifiForm
          value={inputs.wifi}
          onChange={(wifi) => onChangeInputs({ ...inputs, wifi })}
        />
      );
    case 'vcard':
      return (
        <VCardForm
          value={inputs.vcard}
          onChange={(vcard) => onChangeInputs({ ...inputs, vcard })}
        />
      );
    case 'text':
      return (
        <TextForm
          value={inputs.text}
          onChange={(text) => onChangeInputs({ ...inputs, text })}
        />
      );
    case 'email':
      return (
        <EmailForm
          value={inputs.email}
          onChange={(email) => onChangeInputs({ ...inputs, email })}
        />
      );
    case 'sms':
      return (
        <SmsForm
          value={inputs.sms}
          onChange={(sms) => onChangeInputs({ ...inputs, sms })}
        />
      );
    case 'event':
      return (
        <EventForm
          value={inputs.event}
          onChange={(event) => onChangeInputs({ ...inputs, event })}
        />
      );
    default:
      return null;
  }
};

