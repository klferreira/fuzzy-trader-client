import { useState, useEffect, useRef } from "react";
import isEqual from "react-fast-compare";

const validate = (object, schema) =>
  schema.validate(object, { abortEarly: false });

const formatYupErrors = (yupErrs) => {
  if (!yupErrs.inner) {
    throw new Error(`Error in Validation Schema: ${yupErrs.message}`);
  }
  return yupErrs.inner.reduce(
    (errs, err) => ({ ...errs, [err.path]: err.errors }),
    []
  );
};

const curry = (fn) => (...args) =>
  fn.length > args.length ? fn.bind(fn, ...args) : fn(...args);

let timeout;

const useFormState = (
  initValues,
  validationSchema,
  enableReinitialize = false
) => {
  const [values, _setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const [touched, _setTouched] = useState({});
  const initValuesRef = useRef(initValues);

  const isValid = () =>
    Object.values(errors).reduce((e, acc) => !!e.length && acc, true);

  const handleChange = (key, e) => {
    e.preventDefault();

    const newValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    _setValues((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const handleBlur = (key, e) => {
    e.preventDefault();
    _setTouched({ ...touched, [key]: true });
  };

  const handleSubmit = (callback, e) => {
    e.preventDefault();
    const _touched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );

    _setTouched(_touched);
    if (isValid()) callback(values);
  };

  const setField = (key, value) => {
    const changed = { ...values, [key]: value };
    _setValues(changed);
  };

  const setTouched = (key, value) => {
    const changed = { ...touched, [key]: value };
    _setTouched(changed);
  };

  const setValues = (changed) => {
    _setValues(changed);
  };

  const reset = () => {
    if (enableReinitialize) initValuesRef.current = initValues;
    _setValues(initValuesRef.current);
    const _touched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    );
    _setTouched(_touched);
  };

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      validate(values, validationSchema)
        .then(() => setErrors({}))
        .catch((errs) => setErrors(formatYupErrors(errs)));
    }, 250);

    return () => clearTimeout(timeout);
  }, [values, touched, validationSchema]);

  useEffect(() => {
    if (enableReinitialize && !isEqual(initValues, initValuesRef.current))
      reset();
  }, [initValues]);

  return {
    formState: { values, errors, touched },
    handleSubmit: curry(handleSubmit),
    handleChange: curry(handleChange),
    handleBlur: curry(handleBlur),
    setField: curry(setField),
    setTouched: curry(setTouched),
    setValues,
    isValid,
    reset,
  };
};

export default useFormState;
