import nodemailer from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import mailConfig from '@config/mailConfig';

import AppError from '@shared/errors/AppError';
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';

import IMailProviderDTO from '../dtos/IMailProviderDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealProvider implements IMailProvider {
  private transporter: nodemailer.Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        throw new AppError(err.message);
      }

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.transporter = transporter;
    });
  }

  public async send({
    from,
    subject,
    to,
    template,
  }: IMailProviderDTO): Promise<void> {
    const { from: defaultFrom } = mailConfig.config.ethereal;

    const message = {
      from: from || defaultFrom,
      subject,
      to,
      html: await this.mailTemplateProvider.compile(template),
    };

    this.transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(`Ethereal error: ${err}`);
      }

      console.log('Message sent: ', info.messageId);
      console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
  }
}
