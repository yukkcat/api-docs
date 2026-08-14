import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  allowedDevOrigins: ['127.0.0.1'],
  reactStrictMode: true,
};

export default withMDX(config);
