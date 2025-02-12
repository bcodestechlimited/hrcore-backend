import express, { Request, Response } from 'express';
import { canCreateAnnouncement, canDeleteAnnouncement, canFetchAnnouncement, canUpdateAnnouncement } from './guard';
import AnnouncementService from './service';
import response, {
  throwIfError,
  throwPermIfError,
} from '../../utilities/response';
import { validateDTO } from '../../middlewares/validate';
import { UpdateAnnouncementDto, sendMailDto } from './dto';
import mailService from '../../services/mailService';


const router = express.Router();

router.post('/sendmail', async (req: Request, res: Response) => {
  throwPermIfError(await canCreateAnnouncement(req, true));
  const mailreport: { [key: string]: any } = {}; // Add index signature
  const body = validateDTO(sendMailDto, req.body);
  const { subject, emails, message } = body;
  for (let i = 0; i < emails.length; i++) {
    const content = await mailService(subject, emails[i], message, false);
    mailreport[emails[i]] = content;
  }
  return response(res, 200, 'Mail sent', mailreport);
});

router.post('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canCreateAnnouncement(req, true));
  const content = throwIfError(
    await AnnouncementService.create(req.body, { 
      ...perm.query
     }),
  );
  return response(res, content.statusCode, content.message, content.data);
});




router.get('/', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchAnnouncement(req, false));
  const content = throwIfError(
    await AnnouncementService.fetch(req.query, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.get('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canFetchAnnouncement(req, false));
  const content = throwIfError(
    await AnnouncementService.fetchOne(req.query, {
      _id: req.params.id,
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.put('/:id', async (req: Request, res: Response) => {
  const body = validateDTO(UpdateAnnouncementDto, req.body);

  const perm = throwPermIfError(await canUpdateAnnouncement(req, false));
  const content = throwIfError(
    await AnnouncementService.updateOne({ _id: req.params.id, ...perm.query }, body),
  );
  return response(res, content.statusCode, content.message, content.data);
});


router.delete('/:id', async (req: Request, res: Response) => {
  const perm = throwPermIfError(await canDeleteAnnouncement(req, false));
  const content = throwIfError(
    await AnnouncementService.deleteOne(req.params.id, {
      ...perm.query,
    }),
  );
  return response(res, content.statusCode, content.message, content.data);
});

export default router;
