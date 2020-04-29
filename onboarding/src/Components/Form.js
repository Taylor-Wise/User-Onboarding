import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {

    
const initialState = {
    name: "",
    email: "",
    password:"",
    terms: ""
};

const [post, setPost] = useState([]);

const [formState, setFromState] = useState(initialState);

const [buttonDisabled, setButtonDisabled] = useState(true);

const [errors, setErrors] = useState(initialState)



const formSchema = yup.object().shape({
    name: yup.string().required("Name is required to continue."),
    email: yup.string().email("Please enter a valid email.").required(),
    password: yup.string().required("Please create a password to continue"),
    terms: yup.boolean().oneOf([true], "Please agree with our terms before continuing")
});

const validation = e => {
    yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
        setErrors({...errors, [e.target.name]: "" });
    })
    .catch(err => {
        console.log("Error!", err);
        setErrors({...errors, [e.target.name]: err.errors[0] });
    })
};
    

useEffect(() => {
    formSchema.isValid(formSchema).then(valid => {
        setButtonDisabled(!valid);
    });
}, [formState]);

const inputChanges = e => {
    e.persist();

    const formData = {
        ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validation(e);
    setFromState(formData);
};

    return(
        <form>
            <label htmlFor="name">Name</label>
            <input
            id="name" 
            type="text"
            name="name"
            onChange={inputChanges}
            value={formState.name}
            />

            <label htmlFor="email">Email</label>
            <input
            id="email"
            type="email"
            name="email"
            onChange={inputChanges}
            value={formState.email}
            />

            <label htmlFor="password">Password</label>
            <input
            id="password"
            type="text"
            name="password"
            onChange={inputChanges}
            value={formState.password}
            />

            <label htmlFor="terms">Terms & Conditions </label>
            <input
            id="terms"
            type="checkbox"
            name="terms"
            checked={formState.terms}
            onChange={inputChanges}
            />

            <button disabled={buttonDisabled} type="submit">Submit</button>
        </form>
    )

};


export default Form;