import { describe, it, expect } from 'vitest';
import { formatQRPayload } from './qrFormatters';
import { QRInputs } from '../types/qr.types';
import { PRESET_LOGOS } from '../data/presetLogos';
import { FRAME_PRESETS } from '../data/framePresets';

const mockInputs: QRInputs = {
  url: 'https://example.com/test?a=1&b=2',
  wifi: {
    ssid: 'Home "WiFi";Special:Net',
    password: 'p;a:s\\s"word',
    encryption: 'WPA',
    hidden: true,
  },
  vcard: {
    firstName: 'Thang',
    lastName: 'Le',
    organization: 'Google Deepmind',
    title: 'Senior Engineer',
    phoneMobile: '+84901234567',
    phoneWork: '+84243999999',
    email: 'thang.le@deepmind.com',
    website: 'https://deepmind.google',
    addressStreet: '123 Ba Trieu',
    city: 'Hanoi',
    country: 'Vietnam',
  },
  text: 'Xin chào thế giới! 100% Client-Side QR Generator.',
  email: {
    email: 'support@me-qr.com',
    subject: 'Feedback & Request',
    body: 'Tôi muốn yêu cầu tính năng mới...',
  },
  sms: {
    phoneNumber: '+84988888888',
    message: 'Ma xac thuc cua ban la 123456',
  },
  event: {
    title: 'Hoi thao AI Antigravity',
    location: 'Hanoi, Vietnam',
    startTime: '2026-11-20T09:00',
    endTime: '2026-11-20T17:00',
    description: 'Chia se ve cac ky thuat Agentic AI moi nhat',
  },
};

describe('QR Payload Formatters - Core & Edge Cases', () => {
  it('formats URL correctly and trims whitespace', () => {
    expect(formatQRPayload('url', { ...mockInputs, url: '   https://google.com   ' })).toBe('https://google.com');
  });

  it('prepends https:// when missing protocol on URL', () => {
    expect(formatQRPayload('url', { ...mockInputs, url: 'sub.domain.vn/path' })).toBe('https://sub.domain.vn/path');
  });

  it('provides default fallback for empty URL', () => {
    expect(formatQRPayload('url', { ...mockInputs, url: '' })).toBe('https://me-qr.com');
  });

  it('escapes Wi-Fi special characters correctly', () => {
    const res = formatQRPayload('wifi', mockInputs);
    expect(res).toContain('S:Home \\"WiFi\\"\\;Special\\:Net;');
    expect(res).toContain('P:p\\;a\\:s\\\\s\\"word;');
    expect(res).toContain('H:true;;');
  });

  it('formats open/unencrypted Wi-Fi correctly without password', () => {
    const openWifiInputs: QRInputs = {
      ...mockInputs,
      wifi: { ssid: 'Free-Cafe', password: 'secret', encryption: 'nopass', hidden: false },
    };
    const res = formatQRPayload('wifi', openWifiInputs);
    expect(res).toBe('WIFI:T:nopass;S:Free-Cafe;P:;H:false;;');
  });

  it('formats full vCard 3.0 specification correctly', () => {
    const res = formatQRPayload('vcard', mockInputs);
    expect(res.startsWith('BEGIN:VCARD\nVERSION:3.0')).toBe(true);
    expect(res).toContain('N:Le;Thang;;;');
    expect(res).toContain('FN:Thang Le');
    expect(res).toContain('ORG:Google Deepmind');
    expect(res).toContain('TEL;TYPE=CELL:+84901234567');
    expect(res).toContain('EMAIL:thang.le@deepmind.com');
    expect(res).toContain('ADR:;;123 Ba Trieu;Hanoi;;;Vietnam');
    expect(res.endsWith('END:VCARD')).toBe(true);
  });

  it('formats raw text correctly', () => {
    expect(formatQRPayload('text', mockInputs)).toBe(mockInputs.text);
  });

  it('formats email with encoded query parameters', () => {
    const res = formatQRPayload('email', mockInputs);
    expect(res).toContain('mailto:support@me-qr.com?');
    expect(res).toContain('subject=Feedback+%26+Request');
  });

  it('formats SMS payload with standard SMSTO protocol', () => {
    const res = formatQRPayload('sms', mockInputs);
    expect(res).toBe('SMSTO:+84988888888:Ma xac thuc cua ban la 123456');
  });

  it('formats event with iCalendar RFC 5545 protocol and UTC timestamp', () => {
    const res = formatQRPayload('event', mockInputs);
    expect(res).toContain('BEGIN:VCALENDAR');
    expect(res).toContain('BEGIN:VEVENT');
    expect(res).toContain('SUMMARY:Hoi thao AI Antigravity');
    expect(res).toContain('LOCATION:Hanoi, Vietnam');
    expect(res).toContain('DTSTART:20261120T');
    expect(res).toContain('END:VEVENT');
    expect(res).toContain('END:VCALENDAR');
  });
});

describe('Design Presets Integrity', () => {
  it('has 10 valid preset logos with SVG data URLs', () => {
    expect(PRESET_LOGOS.length).toBeGreaterThanOrEqual(8);
    PRESET_LOGOS.forEach((logo) => {
      expect(logo.id).toBeTruthy();
      expect(logo.name).toBeTruthy();
      expect(logo.dataUrl.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    });
  });

  it('has valid frame presets with ME-QR templates', () => {
    expect(FRAME_PRESETS.length).toBeGreaterThan(400);
    const ids = FRAME_PRESETS.map((f) => f.id);
    expect(ids).toContain('none');
    expect(FRAME_PRESETS[0].templateUrl).toBeNull();
    expect(FRAME_PRESETS[1].templateUrl).toBeTruthy();
  });
});
