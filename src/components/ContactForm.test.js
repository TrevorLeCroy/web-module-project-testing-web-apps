import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import DisplayComponent from './DisplayComponent';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    const form   = render(<ContactForm/>);
    const header = form.getByText('Contact Form');

    expect(header).toBeInTheDocument();
    expect(header).not.toBeUndefined();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText('First Name*');

    userEvent.type(firstNameInput, 'Sure');
    const firstNameInputError = screen.getByText('Error: firstName must have at least 5 characters.');
    
    expect(firstNameInputError).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submit = screen.getByRole('button', {type: 'submit'});

    submit.click();

    const firstNameError = screen.getByText('Error: firstName must have at least 5 characters.');
    const lastNameError  = screen.getByText('Error: lastName is a required field.');
    const emailError     = screen.getByText('Error: email must be a valid email address.');

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText('First Name*');
    const lastNameInput  = screen.getByLabelText('Last Name*');
    const emailInput     = screen.getByLabelText('Email*');

    userEvent.type(firstNameInput, 'sure thing');
    userEvent.type(lastNameInput, 'sure');
    userEvent.type(emailInput, 'sure');
    
    const emailError = screen.getByText('Error: email must be a valid email address.');
    expect(emailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const emailInput = screen.getByLabelText('Email*');
    
    userEvent.type(emailInput, 'sure');

    const emailError = screen.getByText('Error: email must be a valid email address.');
    expect(emailError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    // const lastNameInput  = screen.getByLabelText('Last Name*');
    const submit = screen.getByRole('button', {type: 'submit'});
    
    submit.click();
    
    const lastNameInputError = screen.getByText('Error: lastName is a required field.');
    expect(lastNameInputError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText('First Name*');
    const lastNameInput  = screen.getByLabelText('Last Name*');
    const emailInput     = screen.getByLabelText('Email*');
    const submit = screen.getByRole('button', {type: 'submit'});

    const form = {
        firstName: 'cool first name',
        lastName: 'cool last name',
        email: 'verycool@email.com',
        message: ""
    };

    userEvent.type(firstNameInput, form.firstName);
    userEvent.type(lastNameInput, form.lastName);
    userEvent.type(emailInput, form.email);

    submit.click();

    const display = render(<DisplayComponent form={form}/>);
    const firstName = display.getByDisplayValue(`${form.firstName}`); 
    const lastName  = display.getByDisplayValue(`${form.lastName}`);
    const email     = display.getByDisplayValue(`${form.email}`);

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText('First Name*');
    const lastNameInput  = screen.getByLabelText('Last Name*');
    const emailInput     = screen.getByLabelText('Email*');
    const messageInput   = screen.getByLabelText('Message');
    const submit = screen.getByRole('button', {type: 'submit'});

    const form = {
        firstName: 'cool first name',
        lastName: 'cool last name',
        email: 'verycool@email.com',
        message: "really cool message"
    };

    userEvent.type(firstNameInput, form.firstName);
    userEvent.type(lastNameInput, form.lastName);
    userEvent.type(emailInput, form.email);
    userEvent.type(messageInput, form.message);

    submit.click();

    const display = render(<DisplayComponent form={form}/>);
    const firstName = display.getByDisplayValue(`${form.firstName}`); 
    const lastName  = display.getByDisplayValue(`${form.lastName}`);
    const email     = display.getByDisplayValue(`${form.email}`);
    const message   = display.getByDisplayValue(`${form.message}`);

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
});