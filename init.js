import log from 'loglevel';
import i18n from 'meteor/universe:i18n';
import moment from 'moment';
moment.locale('pt-br');
i18n.setLocale('pt-BR');
import { User } from 'meteor/duckdodgerbrasl:lern-model';

// Material events
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// setup logs
Meteor.startup(() => {
  const env = process.env.NODE_ENV;
  const { logLevel='info' } = Meteor.settings.public;
  log.setLevel(env === 'production' ? 'info' : logLevel);
});

/**
 * Setup configurations for Accounts|Google|Facebook
 *
 */
const configureServices = () => {
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

Meteor.startup(() => {
  if (Meteor.isServer) {
    configureServices();
  };
});

if (Meteor.isClient) {
  /**
   * Enrollment setup
   */
  Accounts.onEnrollmentLink((token, done) => {
    FlowRouter.go('PublicEnrollment', { token });
    done();
  });

  /**
   * Define action for password reset
   * @private
   */
  Accounts.onResetPasswordLink((token, done) => {
    FlowRouter.go('PublicEnrollment', { token });
    done();
  });

  /**
   * Define action for verification link
   * @private
   */
  Accounts.onEmailVerificationLink((token, done) => {
    FlowRouter.go('PublicHome', { token });
    Accounts.verifyEmail(token, (err) => snack(_.isEmpty(err) ?
      'Email verificado' : 'Problemas ao verificar email'));
    done();
  });
}

/**
 * Setup email template
 * @private
 */
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
      `<p>Para isso, precisamos que acesse eonda por esse e-mail. ` +
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

/**
 * Initial user account
 */
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

  };
});
