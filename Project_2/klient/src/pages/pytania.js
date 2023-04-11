import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

function Pytania() {
    let question = ""
    let [pytania, setPytania] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/qanda").then((res)=>{
          console.log(res.data)
          setPytania(res.data)
        })
        showQuestion();
    }, [])
    function showQuestion() {
        let acc = document.getElementsByClassName("accordion");
        let i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                let change = this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (!change) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            })
        }
        if (pytania.length === 0) {
            setTimeout(showQuestion, 1000)
        }
    }
    const initialValues = {
        question: ""
    }
    const validationSchema = Yup.object().shape({
        question: Yup.string().required(),
    })
    const onSubmit = (data)=>{
        console.log(data)
        axios.post("http://localhost:3001/qanda", {
            question: data.question,
        }, {
            headers:{
                token:sessionStorage.getItem("token")
            }}
        ).then((res)=>{
            console.log(res.data)
            window.location.reload()
        })
    }
    const initialValues2 = {
        answer: ""
    }
    const validationSchema2 = Yup.object().shape({
        answer: Yup.string().required()
    })
    const onSubmit2 = (data)=>{
        console.log(data)
        axios.post("http://localhost:3001/qanda", {
            answer: data.answer,
            question: question
        }, {
            headers:{
                token:sessionStorage.getItem("token")
            }}
        ).then((res)=>{
            console.log(res.data)
            window.location.reload()
        })
    }

    let form = <>
    </>
    if (sessionStorage.getItem("supervisor") === "false") {
        form = <> <div className="form">
            <h5 className="description">Zadaj pytanie:</h5>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <label htmlFor="question">Pytanie</label>
                    <Field type="text" id="question" name="question" placeholder="Wprowadź swoje pytanie" />
                    <input type="submit" defaultValue="Wyślij" />
                </Form>
            </Formik>
        </div>
        </>
    }
    return (
        <div>
            {form}
            <br />
            <h5 className="description">Najczęściej zadawane przez Was pytania</h5>
            <br />
            {pytania.map(y=>{
                if (y.answer) {
                    return (
                        <>
                            <button className="accordion">{y.question}</button>
                            <div className="question">
                                <p>{y.answer}</p>
                            </div>
                        </>
                    )
                } else if (sessionStorage.getItem("supervisor") === "true") {
                    return (
                        <div>
                            <button className="accordion" style={{backgroundColor: "darkred", color: "white"}}>{y.question}</button>
                            <div className="question">
                                <Formik initialValues={initialValues2} validationSchema={validationSchema2} onSubmit={onSubmit2}>
                                    <Form>
                                        <br />
                                        <label htmlFor="answer">Odpowiedź</label>
                                        <Field as="textarea" type="text" id="answer" name="answer" placeholder="Wprowadź odpowiedź" />
                                        <input type="submit" defaultValue="Wyślij" onClick={(e)=>{
                                            question = e.target.parentNode.parentNode.parentNode.getElementsByTagName("button").item(0).innerHTML
                                        }
                                        }/>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    )
                }
            })}
            <br />
        </div>
    )
}

export default Pytania;