import React from "react";

const TextToFormField = (props) => {
  const { text, formField, isFormField } = props;

  const resElement = isFormField ? formField : text;

  return resElement;
};

export default TextToFormField;
