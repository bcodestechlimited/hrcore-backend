import express, { Request, Response } from 'express';
import { canCreateGrade, canDeleteGrade, canFetchGrade, canUpdateGrade } from './guard';
import GradeService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateGradeDto } from './dto';


const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateGrade(req, true));
  const content = throwIfError(
    await GradeService.create(req.body, { 
      ...perm.query,
      createdBy: req.user._id,
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchGrade(req, false));
  const content = throwIfError(
    await GradeService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchGrade(req, false));
  const content = throwIfError(
    await GradeService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateGradeDto, req.body);

  const perm = throwPermIfError(await canUpdateGrade(req, false));
  const content = throwIfError(
    await GradeService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteGrade(req, false));
  const content = throwIfError(
    await GradeService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
