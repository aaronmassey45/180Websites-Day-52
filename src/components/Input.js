import React from 'react';

const Input = ({
  label,
  name,
  placeholder,
  value,
  handleChange,
  readOnly,
  handleClick,
}) => {
  return (
    <div className="form-group row">
      <label className="col-2">
        <button
          id={name}
          className={`btn btn-block btn${!readOnly ? '' : '-outline'}-dark`}
          onClick={handleClick}
        >
          {label}
        </button>
      </label>
      <div className="col-10">
        <input
          className={`form-control${readOnly ? '-plaintext' : ''}`}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Input;
