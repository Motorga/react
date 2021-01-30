import React from 'react';
import { Form } from 'react-bootstrap';
import Error from './Error';

const AppSelect = ({ label, name, optionLabel = '', options, required, register, errors}) => (
    <Form.Group>
        <Form.Label>{label} {required ? (<span className="text-danger">*</span>) : ''}</Form.Label>
        <Form.Control ref={register} name={name} as="select" custom className={(errors[name]  ? ' is-invalid' : '')}>
            {optionLabel ? (<option>Choisir votre promotion</option>) : ''}
            {options?.map(option => (
                <option key={option.value}>{option.label}</option>
            ))}
        </Form.Control>
        <Error error={errors[name]} />
    </Form.Group>
)

export default AppSelect;