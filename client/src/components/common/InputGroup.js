import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// Text Area Field

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type, // types are in all inputs because you must declare it a input through type
  onChange
}) => {
  return (
    <div className="input-group mb-3">
        <div className="input-group-prepend">
            <span className="input-group-tex">
                <i className={icon} />
            </span>
        </div>
      <textarea
        className={classnames("form-control", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
