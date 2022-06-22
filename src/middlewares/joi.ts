import Joi from '@hapi/joi';


export const waitlistSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email({ minDomainSegments: 2 })
    .label('email')
    .required(),
  name: Joi.string().trim().label('name').required(),
  referredBy: Joi.string().length(6),
  token: Joi.string().required(),
});
