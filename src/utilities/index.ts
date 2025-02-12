import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import response from './response';
import axios from 'axios';
import { IMethodKeys } from './templates/types';

export const remoteCallWithMethod = async (
  req: Request,
  res: Response,
  data: {
    baseUrl: string;
    mainUrl: string;
    // allowedService: {
    //   [key in IMethodKeys]: string;
    // }[];
    allowedService: {
      [key: string]: IMethodKeys;
    };
    config: axios.AxiosRequestConfig;
  },
) => {
  // get all the url string from the allowedService object
  const allowedServiceUrl = Object.keys(data.allowedService);
  console.log(allowedServiceUrl, 'allowedServiceUrl');
  const { baseUrl, mainUrl, config } = data;
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(req.url, 'req.url');
  const serviceUrl = fullUrl.split(mainUrl)[1];
  console.log(serviceUrl, 'serviceUrl');
  const originalUrl = decodeURIComponent(baseUrl + serviceUrl);
  console.log(originalUrl, 'originalUrl');
  // not just includes but match the url using regex
  const match = allowedServiceUrl.filter((url) => {
    const regex = new RegExp(url);
    return regex.test(serviceUrl);
  });
  if (match.length === 0) {
    return response(res, 403, 'Invalid service url');
  }
  const matchedUrl = match[0];
  console.log(matchedUrl, 'matchedUrl', match, 'match');
  console.log(originalUrl, 'originalUrl');
  const call = await axios({
    ...config,
    method: data.allowedService[matchedUrl],
    url: originalUrl,
    data: req.body,
  });
  res.status(call.status).json(call.data);
};

const customAlphabet = (alphabet: string, size: number) => () => {
  let id = '';
  const bytes = crypto.randomBytes(size);
  for (let i = 0; i < size; i += 1) {
    id += alphabet[bytes[i] % alphabet.length];
  }
  return id;
};

export const throwMiddleware = (fn: any) => async (req: Request, res: Response) => {
  await fn(req, res, (err: any) => {
    if (err) {
      throw err;
    }
  });
};

export const createRandomLetters = (length: any) =>
  customAlphabet(process.env.APP_NAME || '', length)();
export const createRandomNumbers = (length: number) =>
  customAlphabet('0123456789', length)();

export const removeFromData = (theData: any, toRemove: any[]) => {
  let cleanedData = theData;
  const removeFunc = (
    theKey: string,
    newData: string | { [x: string]: any; replace?: any; filter?: any },
  ) => {
    if (typeof newData === 'string') {
      return newData.replace(theKey, '');
    }

    if (Array.isArray(newData)) {
      return newData.filter((i) => i !== theKey);
    }

    if (typeof newData === 'object') {
      return Object.keys(newData).reduce(
        (
          acc: {
            [x: string]: any;
          },
          i,
        ) => {
          if (i !== theKey) {
            acc[i] = newData[i];
          }
          return acc;
        },
        {},
      );
    }

    return newData;
  };
  if (Array.isArray(toRemove)) {
    toRemove.map((key) => {
      cleanedData = removeFunc(key, cleanedData);
    });

    return cleanedData;
  }
  return theData;
};

export const createHex = (size = 20) =>
  crypto.randomBytes(size).toString('hex');

export const generateUniqueReference = (prefix = 'PAY') =>
  `${prefix}-${customAlphabet(
    'ABCDEFGHJKLMNPQRTUVWXYZ23456789',
    2,
  )().toUpperCase()}.${moment().format('YYYYMMDDHHmmss')}`;

export default {
  createRandomLetters,
  createRandomNumbers,
  removeFromData,
  createHex,
  generateUniqueReference,
};
