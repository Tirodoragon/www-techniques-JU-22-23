import React from "react"
import {useEffect, useState} from "react"
import axios from "axios"
import moment from "moment"
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Buffer} from "buffer";

function Home() {
    useEffect(()=>{
        const button = document.querySelector("#click")
        if (button) {
            button.addEventListener("click", feedBunny)
            button.addEventListener("mouseenter", onButton)
            button.addEventListener("mouseleave", offButon)
        }
        if (sessionStorage.getItem("login")) {
            axios.get("http://localhost:3001/dailypet", {
                params:{
                    login:sessionStorage.getItem("login")
                },
                headers:{
                    token:sessionStorage.getItem("token")
                }
            }).then((res)=>{
                console.log(moment(res.data.updatedAt).format("DD/MM/YYYY"), moment().format("DD/MM/YYYY"))
                if (moment(res.data.updatedAt).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")) {
                    let image = require("./images/serce.png");
                    document.getElementById("interactive").src = image;

                    let element = document.getElementById('alignment');
                    element.remove();
                }
            })
        }
    }, [])
    const [bunnies, setBunnies] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/ourpets").then((res)=>{
            console.log(res.data)
            setBunnies(res.data)
        })
    }, [])

    function feedBunny() {
        let image = require("./images/serce.png");
        document.getElementById("interactive").src = image;

        let element = document.getElementById('alignment');
        element.remove();
        axios.post("http://localhost:3001/dailypet", null, {
            params:{
                login:sessionStorage.getItem("login")
            },
            headers:{
                token:sessionStorage.getItem("token")
            }
        })
    }

    function onButton() {
        let image = require("./images/zamknieta.png");
        document.getElementById("interactive").src = image;
    }

    function offButon() {
        let image = require("./images/otwarta.png");
        document.getElementById("interactive").src = image;
    }
    let feed = <></>
    if (sessionStorage.getItem("token")) {
        feed = <article className="feed">
            <img id="interactive" src={require ("./images/otwarta.png")} alt="otwarta łapka królika"/>
            <div id="alignment">
                <button id="click">Daj przysmak</button>
            </div>
            <div className="caption">
                <p>Kliknij na przycisk, aby dać przysmak w łapkę królika.
                    Za każde kliknięcie wesprzemy finansowo fundację pomagającą potrzebującym królikom!
                </p>
            </div>
        </article>
    }
    const initialValues = {
        name: "",
        description: "",
        image: null
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        image: Yup.mixed().required()
    })
    const onSubmit = (data)=>{
        console.log(data)
        let file = document.getElementById("image").files[0]
        let reader = new FileReader()
        reader.onload = function() {
            axios.post("http://localhost:3001/ourpets", {
                name: data.name,
                description: data.description,
                image: reader.result
            }, {
                headers:{
                token:sessionStorage.getItem("token")
            }
            }).then((res)=>{
                console.log(res.data)
                window.location.reload()
            })
        }
        reader.readAsDataURL(file)
    }
    let form = <></>
    if (sessionStorage.getItem("supervisor") === "true") {
        form = <>
            <div className="form">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <h2>Dodaj królika:</h2>
                    <br />
                    <label htmlFor="name">Jak się wabi królik?</label>
                    <Field type="text" id="name" name="name" placeholder="Wprowadź imię królika" />
                    <label htmlFor="description">Opis królika</label>
                    <Field as="textarea" type="text" id="description" name="description" placeholder="Wprowadź opis królika" />
                    <label htmlFor="image">Zdjęcie królika</label>
                    <br />
                    <Field type="file" accept="image/jpeg" id="image" name="image" />
                    <br />
                    <br />
                    <input type="submit" defaultValue="Wyślij" />
                </Form>
            </Formik>
        </div>
        <br />
            <center>
                <h2>Usuń królika:</h2>
            </center>
        </>
    }
    return (
        <div>
            {feed}
            {form}
            <table class="deleteTable">
                <tbody>
                {bunnies.map(y=>{
                    if (sessionStorage.getItem("supervisor") === "true") {
                        return (
                            <div>
                            <td>
                                {y.name}
                            </td>
                            <td>
                                <button type="button" onClick={(e)=>{
                                    axios.post("http://localhost:3001/ourpets", {
                                            flag: "delete",
                                            name: e.target.parentNode.parentNode.getElementsByTagName("td").item(0).innerHTML
                                        }, {
                                            headers:{
                                                token:sessionStorage.getItem("token")
                                            }}
                                    ).then((res)=>{
                                        console.log(res.data)
                                        window.location.reload()
                                    })
                                }}>Usuń</button>
                            </td>
                        </div>)
                    }
                })}
                </tbody>
            </table>
            <br />
            <h5 className="adoption">Nasze króliczki szukają domu:</h5>
            <article className="about">
                {bunnies.map(y=>{
                    return (
                        <div className="section">
                            <div className="element">
                                <img src={"data:image/jpeg;base64," + Buffer.from(y.image).toString("base64")}/>
                            </div>
                            <div className="element">
                                <h5>{y.name}</h5>
                                <p>{y.description}</p>
                            </div>
                        </div>
                    )
                })}
            </article>
        </div>
    )
}

export default Home;