import dotEnv from 'dotenv';
import { __ENV__ } from './constants';

export default dotEnv.config(
    {
      path: __ENV__, 
      debug: true
    }
  )