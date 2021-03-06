import React from 'react';
import Input from "react-validation/build/input";

const Field = ({ title, name, value, setValue, validations, type = "text", min, max }) => {

    return (
        <div className="form-group">
            <label htmlFor={name}>{title}</label>
            <Input
                type={type}
                className="form-control"
                name={name}
                value={value}
                min={min}
                onChange={setValue}
                validations={validations}
                max={max}
            />
        </div>
    );
}

export default Field;