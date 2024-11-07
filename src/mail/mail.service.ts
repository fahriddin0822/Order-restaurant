// import { Injectable } from "@nestjs/common";
// import { MailerService } from "@nestjs-modules/mailer";


// @Injectable()
// export class MailService {
//   constructor(private readonly mailerService: MailerService) {}

//   async sendMail(worker:Worker){
//     const url = `${process.env.API_URL}:${process.env.PORT}/auth/activate/${worker.activation_link}`;
//     await this.mailerService.sendMail({
//       to: worker.email,
//       subject: `Hello! `,
//       template: "./confirm",
//       context: {
//         fullname: worker.,
//         url,
//       },
//     });
//   }

// }
