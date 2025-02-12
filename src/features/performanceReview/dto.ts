import { IsOptional } from 'class-validator';
import { PerformanceReview, PerformanceSection } from './schema';
import { IDocs } from '../../utilities/templates/types';
import { Ref } from '@typegoose/typegoose';
import { Department } from '../department/model';
import { Performance } from '../performance/schema';
import { Position } from '../position/model';

const doc: IDocs = {};

export class CreatePerformanceReviewDto
  implements
    Omit<
      Required<PerformanceReview>,
      | 'createdBy'
      | 'record'
      | 'company'
      | 'lineManager1Recommendation'
      | 'lineManager2Recommendation'
      | 'staffRemarkForManager1'
      | 'staffRemarkForManager2'
      | 'manager1Remark'
      | 'manager2Remark'
    >
{
  // @IsOptional()
  // staffRemarkForManager1: string;
  // @IsOptional()
  // staffRemarkForManager2: string;
  @IsOptional()
  public performance: Ref<Performance>;
  @IsOptional()
  public sections: PerformanceSection[];
  @IsOptional()
  public remarks: string;

  @IsOptional()
  public department: Ref<Department>;

  // @IsOptional()
  // manager1Remark: string;

  // @IsOptional()
  // manager2Remark: string;

  @IsOptional()
  position: Ref<Position>;
}

doc['/'] = {
  POST: {
    schema: CreatePerformanceReviewDto.name,
    description: `
    {
        "sections": [
          {
            "title": "FINANCIAL - REVENUE GROWTH",
            "subTitle": [
              {
                "weight": "5",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Generate 5 business leads every month",
                "kpiId": "504dfdc2-cf3a-480a-a642-a3510f682e0a"
              },
              {
                "weight": "5",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure a Zero Manning gap ",
                "kpiId": "ae16bb44-876f-4e35-83b5-3dabbe9902d7"
              },
              {
                "weight": "5",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure the facilitation of a top-notch onboarding experience for new joiners ",
                "kpiId": "39a76e2f-099d-4c75-a939-7eed75b74643"
              }
            ],
            "queId": "1c0ee3ef-9b81-4e5f-af29-af00e1ae468e",
            "weight": 15,
            "self_score": 7,
            "weighted_score": 0
          },
          {
            "title": "FINANCIAL - REVENUE VARIANCE",
            "subTitle": [
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Populate database of all incoming and outgoing mails and report to HRM on monthly basis ",
                "kpiId": "1126f46e-6413-4e8b-9197-90e9ccb0b023"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure that the overall variance from clients' birthday celebration computation resulting from operational in-efficiencies/computation error does not exceed 5% monthly. ",
                "kpiId": "739b69c5-33b9-4d44-8a71-6294eb7a7df0"
              },
              {
                "weight": "3",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Provide high value customer focused HR services to both internal and external customers  ",
                "kpiId": "5ac89845-7a68-42a1-9df8-0d4691fb2705"
              },
              {
                "weight": "3",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure that the overall revenue variance from Customer Service resulting from operational in-efficiencies/leads lose does not exceed 5% monthly. ",
                "kpiId": "3fdbe55f-5c25-4342-9b93-d4c2bb36c6ad"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Support in collation of the absenteeism rate report  on a weekly basis as well as provide monthly report to HRM  in order for her to advise stakeholders adequately",
                "kpiId": "ba006fc0-2e66-4ba8-9b6a-6150e1b25b2d"
              }
            ],
            "queId": "ad3bcc7d-e86d-4981-828a-bc206f57ca4f",
            "weight": 15,
            "self_score": 10,
            "weighted_score": 0
          },
          {
            "title": "CUSTOMER - CLIENT ENGAGEMENT",
            "subTitle": [
              {
                "weight": "3",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Suggest ways to Implement a minimum of THREE(3) client engagement initiatives in the period under review (Birthday, Anniversary celebration, etc). All clients must be catered to with each engagement activity.",
                "kpiId": "d026ddbb-f94b-4b91-be3f-ab221cced1e0"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure First-call resolution rate is more than 95% of inbound calls.",
                "kpiId": "f9c1a13e-5b6c-42cb-b8d7-8781cd11e2ac"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure number of disgruntled internal and external walk-in customers is zero.",
                "kpiId": "d5a88360-fa23-4e9a-8a67-04b84e8d8fe5"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Conduct at least 1 customer satisfaction survery annually. The result of such survey must be analysed to make recommendations to the management through the HRM",
                "kpiId": "0deae61e-5ca5-4886-8d9d-d9fe3ec6961a"
              }
            ],
            "queId": "029a160a-5054-4af4-892d-4b77f9c3fd72",
            "weight": 12,
            "self_score": 7,
            "weighted_score": 0
          },
          {
            "title": "CUSTOMER - STAFF ENGAGEMENT/ WELFARE/ PERFORMANCE APPRAISAL",
            "subTitle": [
              {
                "weight": "4",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure the company is set-up to delight its internal and external customers on a consistent basis by working with all business units to develop and maintain excellent customer service.",
                "kpiId": "fc3d9ff7-a12d-40a2-9778-304c7ccd976f"
              },
              {
                "weight": "3",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Document all  the Corporate Social Responsibility (CSR) across the organisation by ensuring adequate publication and appropriate archiving for reference purposes.",
                "kpiId": "f7f5e820-806c-4c05-8a57-ec5416b1c747"
              },
              {
                "weight": "3",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Support in organizing Village Meetings (quarterly) for staff. The village meeting must be well attended and a detailed report and action plan must be presented to the HRM after each meeting not exceeding 24 hours.",
                "kpiId": "d3f44957-608d-427f-b7d7-118b5a6e7cf7"
              },
              {
                "weight": "4",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Staff Appraisal: Support the HRM in co-ordinating this (linear/horizontal) and ensure LMs appraise staff according to schedule. Prompt and error free collated report ,",
                "kpiId": "50de288f-be5b-43e5-8668-553485b99785"
              },
              {
                "weight": "3",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure that at least 80% of the staff due for confirmation (staff who have been in employment for at least 6 months) are confirmed on or before the expiration of 6 months  on input from the Compliance dept.",
                "kpiId": "745d19e7-484d-4a1f-8570-202ad246ed84"
              },
              {
                "weight": "3",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Demonstrate empathy on all staff issues. Ensure to acknowledge and resolve(where possible) all issues within 3 hours of receipt of mails or calls. ",
                "kpiId": "806d6d4d-b268-4b09-a1dc-4ac42e95ab2d"
              },
              {
                "weight": "3",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure staff are able to get design on our core values on a weekly basis",
                "kpiId": "b1aa8f04-4f70-4351-810c-16747cbe04c5"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Celebrate employees on their birthdays, anniversaries(work), spouse birthday messages(married), new birth annoucement, wedding announcement, child christening, public holidays,",
                "kpiId": "39f105c7-d727-400a-9df6-6fbec0b77d83"
              }
            ],
            "queId": "1a83041c-cb46-4d9f-94ec-a239bb8131b6",
            "weight": 26,
            "self_score": 14,
            "weighted_score": 0
          },
          {
            "title": "INTERNAL PROCESS - OPERATIONAL EFFICIENCY",
            "subTitle": [
              {
                "weight": "3",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Advocate a proper handshake/smooth relationship with all internal stakeholders(inter dependencies) to ensure 100% performance.",
                "kpiId": "b501e3c0-b9bb-494e-8efa-7b01b2d8b815"
              },
              {
                "weight": "5",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure zero number of service failures recorded on all projects like Customer Service Week, Flight Bookings, Board Meetings, Year End Party and Thanksgiving Service, Corporate Gifts e.t.c. ",
                "kpiId": "9d54440c-4b71-4980-acce-c2841e27256b"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Timely submission of reports, weekly and monthly",
                "kpiId": "9213d374-ddb5-4e22-9e7a-466bcaf61531"
              },
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Reduce risk related to non-compliance with ICS standards, policies by coming up with strategies to engage staff more (monthly initiatives)",
                "kpiId": "a5bf54ff-55da-46ce-a5ad-7bbda375eae3"
              }
            ],
            "queId": "169c97ce-9fdc-410e-91e4-54103bbee3b4",
            "weight": 14,
            "self_score": 8,
            "weighted_score": 0
          },
          {
            "title": "LEARNING AND GROWTH - LEADERSHIP",
            "subTitle": [
              {
                "weight": "3",
                "self_score": "2",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure that unit objectives and goals are achieved by consistently using available resources to achieve desired results",
                "kpiId": "82b66097-9b80-44d1-b1ed-c83edc32b14f"
              }
            ],
            "queId": "3370bc54-7c81-47e9-890a-e4f94bb4e695",
            "weight": 3,
            "self_score": 2,
            "weighted_score": 0
          },
          {
            "title": "LEARNING AND GROWTH  - STAFF DEVELOPMENT",
            "subTitle": [
              {
                "weight": "5",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Communicate KSS time tables and document all materials used",
                "kpiId": "5b384382-ec38-41d5-930b-531af2f3fd5f"
              },
              {
                "weight": "5",
                "self_score": "3",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Ensure to get cognate trainings/certifications and instilling the culture of book reading and research on latest trends in Outsourcing/Business Development space. Support read a book a month initiative within the department and utilize opportunities to share thoughts and ideas gained.",
                "kpiId": "2779fc98-ad6f-4c78-802d-aa76513ca5e0"
              },
              {
                "weight": "5",
                "self_score": "1",
                "manager_score": "",
                "weighted_score": 0,
                "kpiname": "Come-up with creative ways to drive the core Values of ICS Outsourcing Ltd. in all staff, both internal and seconded; also promote knowledge of ICS Outsourcing Services.These campaigns must hold on a monthly basis.",
                "kpiId": "2ad78699-b3a6-48f4-8943-4b1543983252"
              }
            ],
            "queId": "2bc9e9d7-f603-4acd-b1aa-2d5284f15c49",
            "weight": 15,
            "self_score": 5,
            "weighted_score": 0
          }
        ],
        "department": "65d73ca089a050fb2c45df09",
        "performance": "65d747e52cd2299c57f709f8",
        "remarks": "",
        "position": "65d73cc389a050fb2c45df42"
      }
    `,
  },
};

export class UpdatePerformanceReviewDto
  implements
    Omit<Required<PerformanceReview>, 'createdBy' | 'record' | 'company'>
{
  @IsOptional()
  lineManager1Recommendation: string;
  @IsOptional()
  lineManager2Recommendation: string;
  @IsOptional()
  staffRemarkForManager1: string;
  @IsOptional()
  staffRemarkForManager2: string;
  @IsOptional()
  public performance: Ref<Performance>;
  @IsOptional()
  public sections: PerformanceSection[];
  @IsOptional()
  public remarks: string;
  @IsOptional()
  public department: Ref<Department>;

  @IsOptional()
  manager1Remark: string;

  @IsOptional()
  manager2Remark: string;

  @IsOptional()
  position: Ref<Position>;
}

doc['/:id'] = {
  PUT: {
    schema: UpdatePerformanceReviewDto.name,
  },
};

export const docs = doc;
