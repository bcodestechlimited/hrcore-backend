import { Request, Response, NextFunction, } from 'express';

export interface RequestDetail<B, Q = any, P = any> extends Request {
  body: B;
//   query: ParsedQs & Q;
//   params: ParamsDictionary & P;

}
