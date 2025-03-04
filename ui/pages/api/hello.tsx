// filepath: /c:/Projects/turbo-fortnight/turbo-fortnight-ui/pages/api/hello.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://localhost:8000/your-endpoint');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Rust backend' });
  }
}