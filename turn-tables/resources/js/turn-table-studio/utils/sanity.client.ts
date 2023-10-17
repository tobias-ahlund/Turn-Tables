import { createClient } from '@sanity/client';

const client = createClient({
  projectId:"nnkl28x8",
  dataset:"production",
  apiVersion:"2023-01-01",
  useCdn: true,
});

export default client;
