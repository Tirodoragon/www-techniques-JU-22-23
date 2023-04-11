import React from "react";
import * as Yup from "yup";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";

function Fundacje() {
    const [foundation, setFoundation] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/foundation").then((res)=>{
            console.log(res.data)
            setFoundation(res.data)
        })
    }, [])
    const initialValues = {
        name: "",
        web: "",
        description: ""
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        web: Yup.string().required(),
        description: Yup.string().required()
    })
    const onSubmit = (data)=>{
        console.log(data)
            axios.post("http://localhost:3001/foundation", {
                name: data.name,
                web: data.web,
                description: data.description
            }, {
                headers:{
                    token:sessionStorage.getItem("token")
                }}
            ).then((res)=>{
                console.log(res.data)
                window.location.reload()
            })
    }
    let form = <></>
    if (sessionStorage.getItem("supervisor") === "true") {
        form = <div className="form">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <h2>Dodaj fundacje:</h2>
                    <br />
                    <label htmlFor="name">Nazwa fundacji:</label>
                    <Field type="text" id="name" name="name" placeholder="Wprowadź nazwę fundacji"/>
                    <label htmlFor="web">Strona fundacji:</label>
                    <Field type="text" id="web" name="web" placeholder="Wprowadź stronę fundacji"/>
                    <label htmlFor="description">Opis fundacji:</label>
                    <Field as="textarea" type="text" id="description" name="description" placeholder="Wprowadź opis fundacji"/>
                    <input type="submit" defaultValue="Wyślij"/>
                </Form>
            </Formik>
        </div>
    }
    return (
        <div>
            {form}
            <br />
            <h5 className="description">Polecane przez nas królicze fundacje</h5>
            <br />
            <div className="foundation">
                <table>
                    <tbody>
                    <tr>
                        <th>Fundacja</th>
                        <th>Opis</th>
                    </tr>
                    {foundation.map(y=>{
                        if (sessionStorage.getItem("supervisor") === "true") {
                            return (
                            <tr>
                                <td><a href={y.web}>{y.name}</a></td>
                                <td>{y.description}</td>
                                <td><button type="button" onClick={(e)=>{
                                    console.log(e.target.parentNode.parentNode.getElementsByTagName("a").item(0).innerHTML)
                                    axios.post("http://localhost:3001/foundation", {
                                        flag: "delete",
                                        name: e.target.parentNode.parentNode.getElementsByTagName("a").item(0).innerHTML
                                    }, {
                                        headers:{
                                            token:sessionStorage.getItem("token")
                                        }}
                                    ).then((res)=>{
                                        console.log(res.data)
                                        window.location.reload()
                                    })
                                }}>Usuń</button></td>
                            </tr>
                            )
                        } else {
                            return (
                                <tr>
                                    <td><a href={y.web}>{y.name}</a></td>
                                    <td>{y.description}</td>
                                </tr>
                            )
                        }
                    })
                    }
                    </tbody></table>
            </div>
            <br />
        </div>
    )
}

export default Fundacje;