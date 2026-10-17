import nodemailer from 'nodemailer';
import { lookup } from 'node:dns/promises';
export async function mailTransport() {
  const host = process.env.SMTP_HOST; const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER; const pass = process.env.SMTP_PASSWORD;
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass) throw new Error('SMTP is not configured.');
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
  return nodemailer.createTransport({ host: (await lookup(host)).address, port, secure, requireTLS: !secure, tls: { servername: host }, auth: { user, pass }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000 });
}
export function sender() { return { name: 'Algofort', address: process.env.SMTP_FROM || process.env.SMTP_USER }; }
