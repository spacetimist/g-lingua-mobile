// Polyfills for cross-platform compatibility
import { Buffer } from 'buffer';
import stream from 'stream-browserify';
import process from 'process';
import crypto from 'crypto-browserify';

// Global polyfills
global.Buffer = Buffer;
global.stream = stream;
global.process = process;
global.crypto = crypto;

// Optional logging
console.log('Polyfills initialized');

export default function setupPolyfills() {
  return {
    Buffer,
    stream,
    process,
    crypto
  };
}