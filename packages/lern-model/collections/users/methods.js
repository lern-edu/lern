Meteor.users.Schema.extend({
  methods: {
    getName() {
      return this.get('profile.name');
    },

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
        || _.get(this, 'services.google.email') || '';
    },

    hasRole(r) {
      const role = this.getRoles();
      return _.includes(role, r);
    },

    getSettingsRoute() {
      const role = this.getRole();
      return _.capitalize(role) + 'Settings';
    },

    getSetupRoute() {
      const role = this.getRole();
      if (_.isEqual(role, 'student')) {
        if (!this.get('profile.setup'))
          return _.capitalize(role) + 'CourseIngress';
        else return _.capitalize(role) + 'Setup';
      } else _.capitalize(role) + 'Home';
    },

    getHomeRoute() {
      const role = this.getRole();
      if (this.get('profile.setup') && _.isEqual(role, 'student'))
        return _.capitalize(role) + 'Setup';
      else return _.capitalize(role) + 'Home';
    },

    getPlan() {
      return this.get('planProfile.plan');
    },
  },
});
