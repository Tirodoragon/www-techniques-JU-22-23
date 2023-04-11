import React from "react"
import {useEffect, useState} from "react"
import {Formik, Form, Field} from "formik"
import * as Yup from "yup"
import axios from "axios"
import {Buffer} from "buffer"

function Pupile() {
    const [images, setImages] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/images").then((res)=>{
            setImages(res.data)
        })
        showSlides();
    }, [])
    function sendBlob(blob, data) {
        console.log(blob)
        axios.post("http://localhost:3001/images", {image: blob}, {
            params: {
                name: data.name,
                login: sessionStorage.getItem("login"),
                type: blob.split(",")[0].replace("data:", "").replace(";base64", "")
            },
            headers: {
                token: sessionStorage.getItem("token")
            }
        }
        ).then((res)=>{
            console.log(res.data)
            window.location.reload()
        })
    }
    let slideIndex = 0;
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide")
        if (slides.length) {
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 3000);
        } else {
            setTimeout(showSlides, 0);
        }
    }
    const initialValues = {
        name:"",
        image:null
    }
    const validationSchema = Yup.object().shape({
        name:Yup.string().required(),
        image:Yup.mixed().required()
    })
    const onSubmit = (data)=>{
        let file = document.getElementById("image").files[0]
        let reader = new FileReader()
        reader.onload = function() {
            sendBlob(reader.result, data)
        }
        reader.readAsDataURL(file)
    }
    let form = <></>
    if (sessionStorage.getItem("login")) {
        form = <>
            <div className="form">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <h2>Dodaj pupila:</h2>
                    <br  />
                    <label htmlFor="name">Jak się wabi twój królik?</label>
                    <Field type="text" id="name" name="name" placeholder="Wprowadź imię pupila" />
                    <label htmlFor="image">Zdjęcie twojego królika</label>
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
                <h2>Usuń pupila:</h2>
            </center>
        </>
    }
    return (
        <div>
            <br />
            <h5 className="description">Pokaz slajdów z Waszymi uszakami :)</h5>
            <br />
            <div className="slides">
                {images.map(y=>{
                    console.log(Buffer.from(y.image).toString("base64").replace("data", "data:"))
                    return (
                        <div className="slide fade">
                            <img src={"data:image/jpeg;base64," + Buffer.from(y.image).toString("base64")}/>
                            <div className="text">{y.name}</div>
                        </div>
                    )
                })}
            </div>
            <br />
            <br />
                {form}
            <table class="deleteTable">
                <tbody>
                    {images.map(y=>{
                        if (y.login === sessionStorage.getItem("login") || sessionStorage.getItem("supervisor") === "true") {
                            return (<div>
                                <td>
                                    {y.name}
                                </td>
                                <td>
                                    <button type="button" onClick={(e)=>{
                                        axios.post("http://localhost:3001/images", null, {
                                            params:{
                                                login: y.login,
                                                flag: "delete",
                                                name: e.target.parentNode.parentNode.getElementsByTagName("td").item(0).innerHTML
                                            },
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
        </div>
    )
}

export default Pupile;