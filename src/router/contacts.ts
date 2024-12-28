import {Router} from 'express'

import { getContacts } from '../controller';

const router = Router();


router.get('/contacts', getContacts);
  

export { router }