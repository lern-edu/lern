# Content Show - *View*

## Usage
- How to use:
~~~html
<PublicContentShow
    schema={Collection.ContentSchema}
    field='Field to remove from form'
    form={Document where infos are storaged}
    index={index}
    updateQuestionsSelected={Function to update selected questions}
    scored={Question has score?}
    canRemove={Boolean}
    doc={Document to display} />
~~~
- [Example on github](https://github.com/lern-edu/lern-app/blob/develop/client/views/Admin/TestCreate/Form/Basic/Basic.jsx)
~~~html
{_.map(content, (c, i) =>
    <PublicContentShow
      key={i}
      field='content'
      schema={Tests.PageContentSchema}
      updateQuestionsSelected={this.props.updateQuestionsSelected}
      scored={scored}
      index={i}
      form={this}
      canRemove={true}
      doc={c} />
)}
~~~

## Properts
- `schema`
  - **Type**: `Collection.Schema`
    1. `Tests.ContentSchema`
    2. `Tests.PageContentSchema`
    3. `Questions.ContentSchema`
    4. `Courses.ContentSchema`
  - **Description**: Schema to use on `AstroForm`
- `field`
  - **Type**: `String`
  - **Description**: Field to remove content on `form`
- `form`
  - **Type**: `View`
  - **Description**: Parent view who is controlling Document data
- `index`
  - **Type**: `Number`
- `updateQuestionsSelected`
  - **Type**: `Function`
  - **Description**: A Function to update selected questions when some question is removed on `form` content field.
  - **Example**: [see on github page]((https://github.com/lern-edu/lern-app/blob/develop/lern-app/client/views/Admin/TestCreate/Form/Page/Page.jsx).

  ~~~js
    questionsSelected() {
      return _.flatten(_.map(this.props.form.doc.get('pages'), p =>
        _.compact(_.map(p.get('content'), 'question'))));
    },

    updateQuestionsSelected() {
      this.setState({ questionsSelected: this.questionsSelected() });
    },
  ~~~

- `scored`
  - **Type**: `Boolean`
  - **Description**: Simple bool to active if true `TextFields` to insert scores on questions
- `canRemove` - Default: `true`
- `doc`
  - **Type**: `Document`
  - **Description**: Document with content data

# Content Create - *View*

## Usage
- How to use:
~~~html
<PublicContentCreate
    field='Field to remove from form'
    schema={Collection.ContentSchema}
    form={Document where infos are storaged}
    contentTypes={Static Collection}
    updateQuestionsSelected={Function to update questions}
    scored={Test is scored?}
    disableCreateQuestion={Remove create question option?}
    questionsSelected={Selected questions}
    subjects={Subjects fetched} />
~~~
- [Example on github](https://github.com/lern-edu/lern-app/blob/develop/lern-app/client/views/Admin/TestCreate/Form/Page/Create.jsx)
~~~html
<PublicContentCreate
    schema={Tests.PageContentSchema}
    field='content'
    contentTypes={PageContentTypes}
    updateQuestionsSelected={this.props.updateQuestionsSelected}
    scored={scored}
    course={courseId}
    disableCreateQuestion={false}
    questionsSelected={actualQuestionsSelected}
    form={this}
    subjects={subjects} />
~~~

## Properts
- `schema`
  - **Type**: `Collection.Schema`
    1. `Tests.ContentSchema`
    2. `Tests.PageContentSchema`
    3. `Questions.ContentSchema`
    4. `Courses.ContentSchema`
  - **Description**: Schema to use on `AstroForm`
- `field`
  - **Type**: `String`
  - **Description**: Field to insert content on `form`
- `contentTypes`
  - **Type**: `StaticCollection`
    1. `ContentTypes`
    2. `QuestionOptionsContentTypes`
    3. `PageContentTypes`
  - **Description**: This Collection define how many field can be inserted in this content schema
  - **Example**: `QuestionOptionsContentTypes` will only allow fields `text` and `image` on view `ContentCreate`. See all content static collections fields [here](https://github.com/lern-edu/lern-app/blob/develop/lern-app/packages/se-model/collections/static.js).
- `updateQuestionsSelected`
  - **Type**: `Function`
  - **Description**: A Function to update selected questions when new question is added on `form` content field.
  - **Example**: [see on github page]((https://github.com/lern-edu/lern-app/blob/develop/lern-app/client/views/Admin/TestCreate/Form/Page/Page.jsx).

~~~js
  questionsSelected() {
    return _.flatten(_.map(this.props.form.doc.get('pages'), p =>
      _.compact(_.map(p.get('content'), 'question'))));
  },

  updateQuestionsSelected() {
    this.setState({ questionsSelected: this.questionsSelected() });
  },
~~~

- `questionsSelected`
  - **Type**: `[String]`
  - **Description**: An array with all **question ids** already selected. This will prevent to added same question two or more times
- `form`
  - **Type**: `View`
  - **Description**: Parent view who is controlling Document data
- `form`
  - **Type**: `String`
  - **Description**: search tests from this course
- `disableCreateQuestion`
  - **Type**: `Boolean`
  - **Description**: Disable create question option
- `subjects`
  - **Type**: `[Documents]`
  - **Description**: Fetched subjects to display on query to find questions
- **Type**: `Boolean`
- **Description**: Display button to remove content
