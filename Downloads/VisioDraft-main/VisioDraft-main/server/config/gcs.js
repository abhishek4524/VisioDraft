import { Storage } from '@google-cloud/storage';
import path from 'path';

// Load credentials from environment or file
const gcs = new Storage({
  keyFilename: process.env.GCS_KEYFILE || path.join(process.cwd(), 'gcs-service-account.json'),
  projectId: process.env.GCS_PROJECT_ID
});

const bucketName = process.env.GCS_BUCKET || 'your-pyq-bucket';
const bucket = gcs.bucket(bucketName);

export default bucket;
