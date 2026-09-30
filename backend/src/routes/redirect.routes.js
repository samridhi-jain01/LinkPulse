import { Router } from 'express';
import { handleRedirect } from '../controllers/redirect.controllers.js';

const router = Router();

// GET /:code - Redirect to the original URL
router.get('/:code', handleRedirect);

export default router;