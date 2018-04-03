import React from 'react';
import _ from 'lodash';
import { Class } from 'meteor/jagi:astronomy';

/**
 * Screen - bind on view state heigth and width
 * @class
 * @public
 * @memberof LernLayouts.Mixins
 * @example
 * import { Screen } from 'meteor/duckdodgerbrasl:lern-layouts';
 * ...
 * class SomeView extends React.Component {
 * ...
 *  const { innerWidth, innerHeight } = this.state;
 * ...
 * }
 * ...
 * export default Screen(SomeView);
 * @return {object} this.state.innerHeight and this.state.innerWidth
 */


const LernForm = (AstroClass, submitMethod) => {
  let restoreFields = AstroClass && AstroClass.getFieldsNames() || {};

  return class Form extends React.Component {

    // Lifecycle
    constructor(state, props) {
      super(props);
      this.state = {
        errors: {},
        valid: undefined,
        ...state,
      };
    };

    componentWillMount() {
      const { doc } = this.props;
      if (doc) this.state.doc = doc;
      else if (this.props.schema) this.state.doc = new this.props.schema();
      else this.state.doc = new AstroClass();

      if (!AstroClass) restoreFields = this.props.schema.getFieldsNames();
    };

    componentDidMount() {
      const { doc, restore } = this.props;
      if (restore) this.restoreFields(restore);
      this.updateValidation();
    };

    componentWillReceiveProps(props) {
      const { doc, restore } = props;
      if (doc) this.state.doc = doc;
      if (restore) this.restoreFields(restore);
      this.updateValidation();
    };

    // Utils

    updateValidation = (fields) => {
      const { doc } = this.state;

      const validateOptions = { stopOnFirstError: false, simulation: false, cast: false };

      if (_.isString(fields)) validateOptions.fields = [fields];
      else if (_.isArray(fields)) validateOptions.fields = fields;
      else validateOptions.fields = restoreFields;
      if (doc)
        doc.validate(validateOptions, err => {
          const errors = {};
          _.forEach(_.get(err, 'details'), d => errors[d.name] = d.message);
          this.setState({ valid: !err, errors });
        });

    };

    restoreFields = (restore) => {
      const values = _.map(restoreFields, field => restore[field]);
      const obj = _.zipObject(restoreFields, values);
      const cleanObj = _.omit(obj, _.isUndefined);
      this.state.doc.set(cleanObj);
    };

    callback = (key, ...args) => {
      if (key === 'success') {
        this.setState({ valid: true });
        if (_.isFunction(this.handleSubmitSuccess))
          this.handleSubmitSuccess(...args);
        else console.info(args);
      } else if (key === 'error') {
        this.updateValidation();
        if (_.isFunction(this.handleSubmitError))
          this.handleSubmitError(...args);
        else console.warn(args);
      } else throw new Meteor.Error('astroform.callback: wrong type');
    };

    // Handlers

    defaultHandler = (arg, opts) => {

      if (_.isObject(arg)) {

        if (opts.doc) {
          if (opts.operation === 'push') {
            _.forEach(_.keys(arg), key => {

              if (this.state.doc.get('_isNew')) {
                const array = this.state.doc.get(key) || [];
                array.push(arg[key]);
                this.state.doc.set(key, array);
              } else {
                this.state.doc.get(key)
                ? this.state.doc[key].push(arg[key])
                : this.state.doc.set(key, [arg[key]]);
              };

            });
          } else if (opts.operation === 'pull') {
            _.forEach(_.keys(arg), key => {
              const array = this.state.doc.get(key) || [];
              array.splice(arg[key], 1);
              this.state.doc.set(key, array);
            });
          } else this.state.doc.set(arg);
        }

        if (opts.query)
          FlowRouter.withReplaceState(() => FlowRouter.setQueryParams(arg));
        this.updateValidation();
      } else if (_.isString(arg)) {
        return value => {
          if (opts.doc) this.state.doc.set(arg, value);
          if (opts.query) FlowRouter.withReplaceState(() =>
            FlowRouter.setQueryParams({ [arg]: value }));
          this.updateValidation();
        };
      } else throw new Meteor.Error('astroform.defaulthandler: wrong param');
    };

    defaultSubmit = (event) => {
      this.setState({ valid: false });
      if (event && event.preventDefault) event.preventDefault();
      if (!submitMethod) this.callback('error', new Meteor.Error('no submit method set'));
      else if (!this.state.valid)
        this.callback('error', new Meteor.Error('invalid state: submit aborted'));
      else if (_.isFunction(submitMethod)) submitMethod();
      else {
        this.setState({ valid: false });
        Meteor.call(submitMethod, this.state.doc, (err, res) => {
          if (err) {
            this.callback('error', err);
          } else this.callback('success', res);
        });
      };
    };

  };
};

export default LernForm;
