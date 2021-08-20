import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@manrodri-tickets/common';

const router = express.Router();

router.get('/api/tickets/hello', (req: Request, res: Response)=> {
    res.status(201).send("hello world")
})

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(201).send("Ticket created");
  }
);

export { router as createTicketRouter };
