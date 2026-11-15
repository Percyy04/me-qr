import { QRInputs, QRType } from '../types/qr.types';

// Format standard Wi-Fi string escaping special characters
function escapeWifi(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

// Convert YYYY-MM-DDTHH:mm to UTC format YYYYMMDDTHHmm00Z for iCalendar
function formatCalDate(dtStr: string): string {
  if (!dtStr) return '';
  const d = new Date(dtStr);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function formatQRPayload(type: QRType, inputs: QRInputs): string {
  switch (type) {
    case 'url': {
      const url = inputs.url.trim();
      if (!url) return 'https://me-qr.com';
      return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    }

    case 'wifi': {
      const { ssid, password, encryption, hidden } = inputs.wifi;
      const t = encryption === 'nopass' ? 'nopass' : encryption;
      const s = escapeWifi(ssid || 'MyWiFi');
      const p = t === 'nopass' ? '' : escapeWifi(password);
      return `WIFI:T:${t};S:${s};P:${p};H:${hidden ? 'true' : 'false'};;`;
    }

    case 'vcard': {
      const v = inputs.vcard;
      const fn = `${v.firstName} ${v.lastName}`.trim() || 'John Doe';
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${fn}`,
      ];
      if (v.organization) lines.push(`ORG:${v.organization}`);
      if (v.title) lines.push(`TITLE:${v.title}`);
      if (v.phoneMobile) lines.push(`TEL;TYPE=CELL:${v.phoneMobile}`);
      if (v.phoneWork) lines.push(`TEL;TYPE=WORK:${v.phoneWork}`);
      if (v.email) lines.push(`EMAIL:${v.email}`);
      if (v.website) lines.push(`URL:${v.website}`);
      if (v.addressStreet || v.city || v.country) {
        lines.push(`ADR:;;${v.addressStreet};${v.city};;;${v.country}`);
      }
      lines.push('END:VCARD');
      return lines.join('\n');
    }

    case 'text':
      return inputs.text.trim() || 'Scan me with any QR scanner!';

    case 'email': {
      const { email, subject, body } = inputs.email;
      if (!email) return 'mailto:contact@example.com';
      const params = new URLSearchParams();
      if (subject) params.set('subject', subject);
      if (body) params.set('body', body);
      const query = params.toString();
      return `mailto:${email}${query ? `?${query}` : ''}`;
    }

    case 'sms': {
      const { phoneNumber, message } = inputs.sms;
      return `SMSTO:${phoneNumber || '+123456789'}:${message || ''}`;
    }

    case 'event': {
      const ev = inputs.event;
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title || 'Special Event'}`,
      ];
      if (ev.location) lines.push(`LOCATION:${ev.location}`);
      if (ev.startTime) lines.push(`DTSTART:${formatCalDate(ev.startTime)}`);
      if (ev.endTime) lines.push(`DTEND:${formatCalDate(ev.endTime)}`);
      if (ev.description) lines.push(`DESCRIPTION:${ev.description}`);
      lines.push('END:VEVENT', 'END:VCALENDAR');
      return lines.join('\n');
    }

    case 'whatsapp': {
      const wa = inputs.whatsapp;
      const num = wa?.phoneNumber?.replace(/[^0-9]/g, '') || '1234567890';
      const text = encodeURIComponent(wa?.message || '');
      return `https://wa.me/${num}${text ? `?text=${text}` : ''}`;
    }

    case 'phone': {
      const ph = inputs.phone?.phoneNumber || inputs.sms?.phoneNumber || '+1234567890';
      return `tel:${ph}`;
    }

    case 'app':
    case 'multiurl':
    case 'social':
    case 'map': {
      const url = inputs.url.trim();
      if (!url) return `https://quickqr.io/${type}`;
      return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    }

    default:
      return 'https://quickqr.io';
  }
}

