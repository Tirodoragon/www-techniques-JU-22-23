import React from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

function Logowanie() {
    const initialValues = {
        login:"",
        password:""
    }
    const validationSchema = Yup.object().shape({
        login:Yup.string().required(),
        password:Yup.string().required().min(4)
    })
    const onSubmit = (data)=>{
        axios.get("http://localhost:3001/users", {
            params:{
                login:data.login,
                password:data.password
            }
        }).then((res)=>{
            if (res.data.token) {
                sessionStorage.setItem("login", data.login)
                sessionStorage.setItem("supervisor", res.data.sup)
                sessionStorage.setItem("token", res.data.token)
                window.location.href = "/"
            } else {
                document.querySelector(".error").style.color="red"
                document.querySelector(".error").innerHTML="Błędny login lub hasło"
            }
        })
    }
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Logowanie</h1>
            <div className="form">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <label htmlFor="login">Login</label>
                        <Field type="text" id="login" name="login" placeholder="Wprowadź swój login" />
                        <label htmlFor="password">Hasło</label>
                        <Field type="password" id="password" name="password" placeholder="Wprowadź swoje hasło" />
                        <p className="error"></p>
                        <input type="submit" defaultValue="Zaloguj" />
                    </Form>
                </Formik>
            </div>
            <a href="/rejestracja" style={{textAlign: 'center'}}><h5>Nie masz konta? Kliknij tu aby się zarejestrować!</h5></a>
            <br />
        </div>
    )
}

export default Logowanie;