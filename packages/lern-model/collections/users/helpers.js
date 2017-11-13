import _ from 'lodash';

Meteor.users.Schema.extend({
  helpers: {

    getRole() {
      return this.get('profile.role') || _.first(this.get('roles'));
    },

    getRoles() {
      return this.get('roles');
    },

    getEmail() {
      return _.get(_.first(this.emails), 'address');
    },

    getSocialEmail() {
      return _.get(this, 'services.facebook.email')
        || _.get(this, 'services.google.email');
    },

    hasRole(r) {
      const role = this.getRoles();
      return _.includes(role, r);
    },

    getSettingsRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Settings';
    },

    getHomeRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Home';
    },
  },
});
