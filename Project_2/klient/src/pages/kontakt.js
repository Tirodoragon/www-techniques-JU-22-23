import React from "react"
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useEffect, useState} from "react"

function Kontakt() {
    const [kontakt, setKontakt] = useState([])
    useEffect(()=>{
        if (sessionStorage.getItem("supervisor") === "true") {
            axios.get("http://localhost:3001/messages", {
                headers:{
                    token:sessionStorage.getItem("token")
                }
            }).then((res)=>{
                console.log(res.data)
                setKontakt(res.data)
            })
        }
    }, [])
    const initialValues = {
        name: "",
        lname: "",
        mess: ""
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        lname: Yup.string().required(),
        mess: Yup.string().required()
    })
    const onSubmit = (data)=>{
        console.log(data)
        axios.post("http://localhost:3001/messages", {
            name: data.name,
            lname: data.lname,
            mess: data.mess
        }, {
            headers:{
                token:sessionStorage.getItem("token")
            }}
        ).then((res)=>{
            console.log(res.data)
            window.location.reload()
        })
    }
    let form =
        <><div className="form"><Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <label htmlFor="name">Imię</label>
                    <Field type="text" id="name" name="name" placeholder="Wprowadź swoje imię" />
                    <label htmlFor="lname">Nazwisko</label>
                    <Field type="text" id="lname" name="lname" placeholder="Wprowadź swoje nazwisko" />
                    <label htmlFor="mess">Wiadomość</label>
                    <Field as="textarea" type="text" id="mess" name="mess" placeholder="Wprowadź swoją wiadomość" defaultValue={""} />
                    <input type="submit" defaultValue="Wyślij" />
                </Form>
            </Formik>
        </div>
    </>
    if (sessionStorage.getItem("supervisor") === "true") {
        form = <>
            <table id="formTable">
                <tbody>
                    {kontakt.map(y=>{
                        return (
                            <tr>
                                <td>{y.name + " " + y.lname}</td>
                                <td>{y.mess}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    }
    return (
        <div>
            <br />
            <article className="contact">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5124.059304045056!2d19.89804411094986!3d50.04827582896905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b85d0665f6d%3A0x40c5e839801bf6fd!2sPolnych%20Kwiat%C3%B3w%202%2C%2030-206%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1668547141627!5m2!1spl!2spl" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="information">
                    <h5>Zapraszamy do kontaktu z nami!</h5>
                    <p>
                        Adres: ul. Polnych Kwiatów 2, 30-206 Kraków
                        <br />
                        Telefon: 952377121
                        <br />
                        E-mail: kontakt@kroliczanora.pl
                    </p>
                </div>
            </article>
            {form}
            <br />
        </div>
    )
}

export default Kontakt;