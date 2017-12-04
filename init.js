import i18n from 'meteor/universe:i18n';
import moment from 'moment';
moment.locale('pt-br');
i18n.setLocale('pt-BR');
import { User } from 'meteor/duckdodgerbrasl:lern-model';

// Material events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Accounts config
Meteor.startup(() => {
  if (Meteor.isServer) {
    const env = process.env.NODE_ENV;
    ServiceConfiguration.configurations.remove({
      service: 'facebook',
    });

    ServiceConfiguration.configurations.insert({
      service: 'facebook',
      appId: Meteor.settings.credentials.facebook[env].appId,
      secret: Meteor.settings.credentials.facebook[env].secret,
    });

    Accounts.loginServiceConfiguration.remove({
      service: 'google',
    });
    Accounts.loginServiceConfiguration.insert({
      service: 'google',
      clientId: Meteor.settings.credentials.google.appId,
      secret: Meteor.settings.credentials.google.secret,
    });
  };
});

// enrollment setup
if (Meteor.isClient) {
  Accounts.onEnrollmentLink((token, done) => {
    FlowRouter.go('PublicEnrollment', { token });
    done();
  });

  Accounts.onResetPasswordLink((token, done) => {
    FlowRouter.go('PublicEnrollment', { token });
    done();
  });

  Accounts.onEmailVerificationLink((token, done) => {
    FlowRouter.go('PublicHome', { token });
    Accounts.verifyEmail(token, (err) => snack(_.isEmpty(err) ?
      'Email verificado' : 'Problemas ao verificar email'));
    done();
  });
}

// email environment
Meteor.startup(() => {
  if (Meteor.isServer) {
    const { sendgrid } = Meteor.settings.credentials;
    const env = process.env.NODE_ENV;

    if (env === 'production')
      process.env.MAIL_URL = `smtp://${sendgrid.username}:${sendgrid.password}@${sendgrid.server}`;

    Accounts.emailTemplates.siteName = 'Lern';
    Accounts.emailTemplates.from = `<${Meteor.settings.emails.default}>`;
    Accounts.emailTemplates.enrollAccount.subject =
      (user) => `Cadastro Lern`;
    Accounts.emailTemplates.enrollAccount.html = (user, url) =>
      `<h3>Olá ${user.profile.name},<h3><p>Estamos muito felizes por` +
      `você estar conosco nessa jornada.</p>` +
      `<p>Nós, da Lern - Soluções Educaionais, queremos ajudá-lo ao ` +
      `máximo com suas habilidades e desenvolvimento pessoal.</p>` +
      `<p>Para isso, precisamos que acesse esse ` +
      `<a href='${url}'>link de verificação</a> e finalize o seu cadastro.</p>` +
      `<p>Se ainda resta alguma dúvida, responda por esse e-mail. ` +
      `<br>` +
      `<br>` +
      `<p>Caso você ou sua escola não tenham se registrado, ignore esta mensagem.</p>` +
      `<br>` +
      `<p>Equipe Lern .</p>`;

    Accounts.emailTemplates.resetPassword.subject =
      (user) => `Redefinir senha Lern`;
    Accounts.emailTemplates.resetPassword.html = (user, url) =>
      `<h3>Olá ${user.profile.name},<h3><p>Este email contém um link` +
      ` para redefinição de senha.</p>` +
      `<p>Caso não desejar redefinir sua senha desconsidere este email.</p>` +
      `<p>Este é o <a href='${url}'>link de verificação</a> para redefinição de senha.</p>` +
      `<p>Equipe Lern - Soluções Educacionais.</p>`;

    Accounts.emailTemplates.verifyEmail.subject =
      (user) => `Lern - Verificação de email`;
    Accounts.emailTemplates.verifyEmail.html = (user, url) =>
      `<h3>Olá ${user.profile.name},<h3><p>Este email contém um link` +
      ` para verificação de email.</p>` +
      `<p>Este é o <a href='${url}'>link de verificação</a> para verificação.</p>` +
      `<p>Equipe Lern - Soluções Educacionais.</p>`;
  }
});

// initial user account
Meteor.startup(() => {
  if (Meteor.isServer) {
    if (!Meteor.users.findOne()) {
      const { admin } = Meteor.settings.credentials;
      admin.profile = {
        name: 'Lern Admin',
        firstName: 'Lern',
        lastName: 'Admin',
      };
      const userId = Accounts.createUser(admin);
      const user = User.findOne(userId);
      user.roles = ['admin'];
      user.save();
    };

    // const subjectToCreate = Meteor.settings.public.subject || {};
    // const tagToCreate = Meteor.settings.public.tag || {};
    //
    // if (!Subjects.findOne(subjectToCreate._id)) {
    //   const subject = new Subjects.Schema(subjectToCreate);
    //   const tag = new Tags.Schema(tagToCreate);
    //   subject.save();
    //   tag.save();
    // };

  };
});
