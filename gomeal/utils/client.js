import sanityClient from '@sanity/client';
import config from './config';
const client = sanityClient({
  projectId: config.projectId,
  apiVersion: '2022-09-27',
  dataset: config.dataset,
  useCdn: true,
});
export default client;
