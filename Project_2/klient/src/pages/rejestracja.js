import React from "react"
import * as Yup from "yup";
import axios from "axios";
import {Formik, Form, Field} from "formik";

function Rejestracja() {
    function equalTo(ref, msg) {
        return this.test({
            name: 'equalTo',
            exclusive: false,
            message: msg || 'Hasła muszą być identyczne',
            params: {
                reference: ref.path
            },
            test: function(value) {
                return value === this.resolve(ref)
            }
        })
    };

    Yup.addMethod(Yup.string, 'equalTo', equalTo);
    const initialValues = {
        login:"",
        password:"",
        passwordrepeat:""
    }
    const validationSchema = Yup.object().shape({
        login:Yup.string().required(),
        password:Yup.string().required().min(4),
        passwordrepeat:Yup.string().required().equalTo(Yup.ref("password"))
    })
    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/users", null, {
            params:{
                login:data.login,
                password:data.password,
                sup:0
            },
            headers:{
                token:sessionStorage.getItem("token")
            }}
        ).then((res)=>{
            if (res.data !== "User exists") {
                window.location.href = "/logowanie"
            } else {
                document.querySelector(".error").style.color="red"
                document.querySelector(".error").innerHTML="Użytkownik o podanym loginie już istnieje"
            }
        })
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Rejestracja</h1>
            <div className="form">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <label htmlFor="login">Login</label>
                        <Field type="text" id="login" name="login" placeholder="Wprowadź login" />
                        <label htmlFor="password">Hasło</label>
                        <Field type="password" id="password" name="password" placeholder="Wprowadź hasło" />
                        <label htmlFor="passwordrepeat" />
                        <Field type="password" id="passwordrepeat" name="passwordrepeat" placeholder="Powtórz hasło" />
                        <p className="error"></p>
                        <input type="submit" defaultValue="Zarejestruj" />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Rejestracja;