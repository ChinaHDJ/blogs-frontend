class FormApi{

  static getForm(formId){
    const form = document.getElementById(formId);

    return FormApi.foreachFormElement(form)
  }

  static foreachFormElement(form){
    const fieldData = {};

    ['input', 'check'].forEach(tag => {
      const tags = form.getElementsByTagName(tag);

      for (let i = 0; i < tags.length; i++) {
        const { name, value, checked } = tags[i];

        fieldData[name] = { value, checked };
      }
    });

    return fieldData;
  }

  static onSubmit = (onSubmit, formId) => (event) => {
    event.preventDefault();

    onSubmit(FormApi.getForm(formId));
  }
}

export default FormApi;
