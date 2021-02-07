import React from 'react';
import { Form } from 'react-bootstrap';
import Error from './Error';

const AppInput = ({ label, name, defaultValue, type = 'text', required, register, errors}) => (
    <Form.Group>
        <Form.Label>{label} {required ? (<span className="text-danger">*</span>) : ''}</Form.Label>
        <Form.Control ref={register} name={name} type={type} required={required} defaultValue={defaultValue} className={(errors[name]  ? ' is-invalid' : '')} />
        <Error error={errors[name]} />
    </Form.Group>
)

export default AppInput;