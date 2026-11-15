import React from 'react';
import { Input } from '../../common/Input';

interface UrlFormProps {
  value: string;
  onChange: (val: string) => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4 py-2">
      <Input
        label="Đường dẫn trang web (URL)"
        placeholder="https://example.com hoặc yourdomain.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        helper="Người quét sẽ được chuyển hướng thẳng tới liên kết này."
        autoFocus
      />
    </div>
  );
};

