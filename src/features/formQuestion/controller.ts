import express, { Request, Response } from 'express';
import { canCreateFormQuestion, canDeleteFormQuestion, canFetchFormQuestion, canUpdateFormQuestion } from './guard';
import FormQuestionService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import _ from 'passport-local-mongoose';
const router = express.Router();
const FormQuestionPathName = '/FormQuestion';
/**
 * @openapi
 * 
 * /FormQuestion:
 *   post:
 *     summary: Create a new FormQuestion
 *     tags:
 *       - FormQuestions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
 *     responses:
 *       201:
 *         description: FormQuestion created successfully
//  *         content:
//  *           application/json:
 */
router.post('/', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateFormQuestion(req, true));
  const content = throwIfError(
    await FormQuestionService.create(req.body, { createdBy: req.user._id }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches all FormQuestions
 *
 * @openapi
 *
 * /FormQuestion:
 *   get:
 *     summary: Fetch all FormQuestions
 *     tags:
 *       - FormQuestions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: FormQuestions fetched successfully
 */
router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFormQuestion(req, false));
  const content = throwIfError(
    await FormQuestionService.fetch(req.query, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Fetches a single FormQuestion by ID
 *
 * @openapi
 *
 * /FormQuestion/{id}:
 *   get:
 *     summary: Fetch a single FormQuestion by ID
 *     tags:
 *       - FormQuestions
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
 *         description: FormQuestion fetched successfully
 */
router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchFormQuestion(req, false));
  const content = throwIfError(
    await FormQuestionService.fetchOne(req.query, {
      _id: req.params.id,
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Updates a single FormQuestion by ID
 * 
 * @openapi
 * 
 * /FormQuestion/{id}:
 *   put:
 *     summary: Update a single FormQuestion by ID
 *     tags:
 *       - FormQuestions
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
 *         description: FormQuestion updated successfully
 */
router.put('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canUpdateFormQuestion(req, false));
  const content = throwIfError(
    await FormQuestionService.updateOne({ _id: req.params.id, ...perm.query }, req.body),
  );
  return response(res, content.statusCode, content.message, content.data);
});

/**
 * Deletes a single FormQuestion by ID
 * 
 * @openapi
 * 
 * /FormQuestion/{id}:
 *   delete:
 *     summary: Delete a single FormQuestion by ID
 *     tags:
 *       - FormQuestions
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
 *         description: FormQuestion deleted successfully
//  *         content:
//  *           application/json:
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteFormQuestion(req, false));
  const content = throwIfError(
    await FormQuestionService.deleteOne(req.params.id, {
      createdBy: req.user._id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
