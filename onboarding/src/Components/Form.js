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

const [users, setUsers] = useState([]);

const [post, setPost] = useState([]);

const [formState, setFormState] = useState(initialState);

const [buttonDisabled, setButtonDisabled] = useState(true);

const [errors, setErrors] = useState(initialState);



const formSchema = yup.object().shape({
    name: yup.string().required("Name is required to continue."),
    email: yup.string().email("Please enter a valid email.").required(),
    password: yup.string().required("Please create a password to continue"),
    terms: yup.boolean().oneOf([true], "Please agree with our terms before continuing")
});

const validation = e => {
    yup
    .reach(formSchema, e.target.name)
    .validate(e.target.name === "terms" ? e.target.checked: e.target.value)
    .then(valid => {
        setErrors({...errors, [e.target.name]: "" });
    })
    .catch(err => {
        console.log("Error!", err);
        setErrors({...errors, [e.target.name]: err.errors[0] });
    })
};
    

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    })
}, [formState]);

const inputChanges = e => {
    e.persist();

    const formData = {...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked: e.target.value
    }
    setFormState(formData);
};

const formSubmit = e => {
e.preventDefault();

axios.post("https://reqres.in/api/users", formState)
.then(response => {
   
    setPost(response.data);
    setUsers(response.data);
    setFormState(initialState);

    console.log("Post", post);
    console.log("users", users);
    validation(inputChanges);
})
.catch(err => {
    console.log("Error!", err);
})

};

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">Name
            <input
            id="name" 
            type="text"
            name="name"
            onChange={inputChanges}
            value={formState.name}
            data-cy="name"
            />
            {errors.name.length > 0 ? (<p>{errors.name}</p>): null}
            </label>

            <label htmlFor="email">Email
            <input
            id="email"
            type="email"
            name="email"
            onChange={inputChanges}
            value={formState.email}
            data-cy="email"
            />
            {errors.email.length > 0 ? (<p>{errors.email}</p>) : null}
            </label>

            <label htmlFor="password">Password
            <input
            id="password"
            type="password"
            name="password"
            onChange={inputChanges}
            value={formState.password}
            data-cy="password"
            />
            {errors.password.length > 3 ? (<p>{errors.password}</p>): null}
            </label>

            <label htmlFor="terms">Terms & Conditions 
            <input
            id="terms"
            type="checkbox"
            name="terms"
            checked={formState.terms}
            onChange={inputChanges}
            />
            {errors.terms.length > 0 ? ( <p>{errors.terms}</p>): null}
            </label>

            

            <button data-cy="submitButton" disabled={buttonDisabled} type="submit">Submit</button>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          
        </form>
    )

};


export default Form;