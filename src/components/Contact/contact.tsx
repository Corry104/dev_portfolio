import { useEffect, useRef, useState } from 'react';  
import { Comment } from 'react-loader-spinner';
import './contact.scss';
import { AnimatedLetters } from '../AnimatedLetters/animatedLetters';
import emailjs from '@emailjs/browser';


export const Contact: React.FC = () => {
    const [lettersAnimation, setLettersAnimation] = useState('text-animate');
    const [emailTemplate, setEmailTemplate] = useState({name:'', email:'', subject:'', message:''})
    const refForm = useRef<HTMLFormElement>(null);
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
    const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
    const TEMPLATE_ID_ = process.env.REACT_APP_TEMPLATE_ID;
 
    const contactMe = 'Contact Me'.split('');

    useEffect(() => {
        setTimeout(() => {
            setLettersAnimation('text-animate-hover')
        }, 3000);
    }, [])


    const sendEmail = (e:any) => {
        e.preventDefault();
        
        emailjs
            .send(SERVICE_ID, TEMPLATE_ID_, emailTemplate, PUBLIC_KEY)
            .then((res:any) => {
                console.log("🚀 ~ .then ~ res:", res)
                alert('Email sent succesfully - ')
                // window.location.reload();
                setEmailTemplate({name:'', email:'', subject:'', message:''})

            }, (error:any) => {
                console.log("🚀 ~ .then ~ error:", error)
                
            })
               
    }

    return (
        <>
            <div className='container contact-page'>
                <div className='paragraph'>
                    <h1>
                        <AnimatedLetters
                            letters={lettersAnimation}
                            message={contactMe}
                            idx={15}
                        />
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Accusantium ea ullam suscipit voluptate itaque veniam facilis, iure magnam libero, officiis culpa odit molestias ipsam ex beatae temporibus quae, tempora commodi.
                    </p>
                    <div className="contact-form">
                        <form ref={refForm} onSubmit={sendEmail}>
                            <ul>
                                <li className="half-view">
                                    <input 
                                        type="text" 
                                        placeholder='Name*' 
                                        name="name" 
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setEmailTemplate({...emailTemplate, 'name': e.target.value});
                                        }}
                                        value={emailTemplate['name']}
                                        required 
                                    />
                                </li>
                                <li className="half-view">
                                    <input 
                                        type="email" 
                                        placeholder='Email*' 
                                        name="email"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setEmailTemplate({...emailTemplate, 'email': e.target.value});
                                        }}
                                        value={emailTemplate['email']}
                                        required 
                                    />
                                </li>
                                <li>
                                    <input
                                        placeholder="Subject*"
                                        type="text"
                                        name="subject"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setEmailTemplate({...emailTemplate, 'subject': e.target.value});
                                        }}
                                        value={emailTemplate['subject']}
                                        required
                                    />
                                </li>
                                <li>
                                    <textarea
                                        placeholder="Message*"
                                        name="message"
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            setEmailTemplate({...emailTemplate, 'message': e.target.value});
                                        }}
                                        value={emailTemplate['message']}
                                        required
                                    ></textarea>
                                </li>
                                <li>
                                    <input type="submit" className="flat-button" value="SEND" />
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                
            </div>

            {/* loading component */}
            <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperClass="loader-active"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </>
    )
}