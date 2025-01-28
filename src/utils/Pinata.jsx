// utils/pinata.js
import axios from 'axios';

const PINATA_API_URL = 'https://api.pinata.cloud';
const PINATA_API_KEY = '9b9a8ca76fbdbb0577cc';
const PINATA_SECRET_KEY = 'c579faa96319fe7dba9b7088508a1920d2132a383ad5a59c0048cea517a2cf73';

export const uploadFileToPinata = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${PINATA_API_URL}/pinning/pinFileToIPFS`, formData, {
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });
    return response.data.IpfsHash; // Returns IPFS hash
  } catch (error) {
    console.error('Error uploading file to Pinata', error);
    throw error;
  }
};