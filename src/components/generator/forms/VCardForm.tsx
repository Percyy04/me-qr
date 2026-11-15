import React from 'react';
import { Input } from '../../common/Input';
import { QRInputs } from '../../../types/qr.types';

interface VCardFormProps {
  value: QRInputs['vcard'];
  onChange: (val: QRInputs['vcard']) => void;
}

export const VCardForm: React.FC<VCardFormProps> = ({ value, onChange }) => {
  const update = (field: keyof QRInputs['vcard'], val: string) => {
    onChange({ ...value, [field]: val });
  };

  return (
    <div className="space-y-3 py-2">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Tên"
          placeholder="Văn An"
          value={value.firstName}
          onChange={(e) => update('firstName', e.target.value)}
        />
        <Input
          label="Họ"
          placeholder="Nguyễn"
          value={value.lastName}
          onChange={(e) => update('lastName', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Công ty / Tổ chức"
          placeholder="Công ty ABC"
          value={value.organization}
          onChange={(e) => update('organization', e.target.value)}
        />
        <Input
          label="Chức danh"
          placeholder="Giám đốc Marketing"
          value={value.title}
          onChange={(e) => update('title', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Số di động"
          placeholder="0987654321"
          value={value.phoneMobile}
          onChange={(e) => update('phoneMobile', e.target.value)}
        />
        <Input
          label="Số bàn / cơ quan"
          placeholder="0241234567"
          value={value.phoneWork}
          onChange={(e) => update('phoneWork', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Email"
          type="email"
          placeholder="an.nguyen@example.com"
          value={value.email}
          onChange={(e) => update('email', e.target.value)}
        />
        <Input
          label="Website"
          placeholder="https://an.dev"
          value={value.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Input
          label="Địa chỉ"
          placeholder="123 Phố Huế"
          value={value.addressStreet}
          onChange={(e) => update('addressStreet', e.target.value)}
        />
        <Input
          label="Thành phố"
          placeholder="Hà Nội"
          value={value.city}
          onChange={(e) => update('city', e.target.value)}
        />
        <Input
          label="Quốc gia"
          placeholder="Việt Nam"
          value={value.country}
          onChange={(e) => update('country', e.target.value)}
        />
      </div>
    </div>
  );
};

