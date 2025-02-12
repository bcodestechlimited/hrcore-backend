import express, { Request, Response } from 'express';
import { canCreateForm, canDeleteForm, canFetchForm, canUpdateForm } from './guard';
import FormService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const FormPathName = '/Form';
/**
 * @openapi
 * 
 * /Form:
 *   post:
 *     summary: Create a new Form
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: Form created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateForm(req, true));
  const content = throwIfError(
    await FormService.create(req.body, { createdBy: req.user._id }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all Forms
 *
 * @openapi
 *
 * /Form:
 *   get:
 *     summary: Fetch all Forms
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Forms fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchForm(req, false));
  const content = throwIfError(
    await FormService.fetch(req.query, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single Form by ID
 *
 * @openapi
 *
 * /Form/{id}:
 *   get:
 *     summary: Fetch a single Form by ID
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchForm(req, false));
  const content = throwIfError(
    await FormService.fetchOne(req.query, {
      _id: req.params.id,
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single Form by ID
 * 
 * @openapi
 * 
 * /Form/{id}:
 *   put:
 *     summary: Update a single Form by ID
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       200:
 *         description: Form updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateForm(req, false));
  const content = throwIfError(
    await FormService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single Form by ID
 * 
 * @openapi
 * 
 * /Form/{id}:
 *   delete:
 *     summary: Delete a single Form by ID
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteForm(req, false));
  const content = throwIfError(
    await FormService.deleteOne(req.params.id, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
