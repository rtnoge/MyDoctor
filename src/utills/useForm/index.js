import { useState } from "react";

export const useForm = (initianValue) => {
  const [values, setValues] = useState(initianValue);
  return [
    values,
    (type, params) => {
      if (type === 'reset') {
        return setValues(initianValue);
      }
      return setValues({ ...values, [type]: params });
    },
  ];
};
