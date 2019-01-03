class FormApi{

  static getForm(formId){
    const form = document.getElementById(formId);

    return FormApi.foreachFormElement(form)
  }

  static foreachFormElement(form){
    const fieldComponents = [];

    ['input', 'check'].forEach(tag => {
      const tags = form.getElementsByTagName(tag);
      for (let i = 0; i < tags.length; i++) {
        const { name, value, checked } = tags[i];
        fieldComponents.push({ name, value, checked })
      }
    });

    return fieldComponents;
  }

  static onSubmit = (onSubmit, formId) => (event) => {
    event.preventDefault();

    onSubmit(FormApi.getForm(formId));
  }
}

export default FormApi;
