import {useRef, useState} from "react";
import emailjs from 'emailjs-com';

type Props = {
    onButtonClick: () => void;
};

const Contact = ({onButtonClick}: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const [sent, setSent] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;
        if(!formRef.current.name || !formRef.current.email || !formRef.current.title || !formRef.current.message?.value) {
            alert("Please fill in all fields.");
            return;
        }
        btnRef.current?.classList.add("bounce");
        setTimeout(() => btnRef.current?.classList.remove("bounce"), 400);

        emailjs
            .sendForm(
                'service_iqd6gpy',
                'template_u7vb1c1',
                formRef.current,
                'bdiI2UsT6xOIiPW3g'
            )
            .then(
                () => {
                setSent(true); 
                formRef.current?.reset();
                setTimeout(() => setSent(false), 3000); 
                },
                (error) => {
                    console.log('Failed:', error.text);
                    alert("Failed to send message.");
                }
            );
    };


    return(
        <section className="contact">

            <button className="return-button" onClick={onButtonClick}>
                <img src="images/message.svg" alt="Return"/>
                <h3>Return Home</h3>
            </button>
            <h1>
                Get In Touch With Me!
            </h1>
            <div className={'form-wrapper'}>
                <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
                    <div className={'form-part'}>
                        <p>
                            Name
                        </p>
                        <input type="text" name="name" id="name" placeholder="Your name" maxLength={50}/>
                    </div>

                    <div className={'form-part'}>
                        <p>
                        Email
                        </p>
                        <input type="email" name="email" id="email" placeholder="your@email.com" maxLength={50}/>
                    </div>
                    <div className={'form-part'}>
                        <p>
                            Subject
                        </p>
                        <input type="text" name="title" id="title" placeholder="Message Subject" maxLength={50}/>
                    </div>
                    <div className={'form-part'}>
                           <p>Message</p>
                        <textarea 
                            className={'form-message'} 
                            name="message" 
                            id="message" 
                            placeholder="Write your message here..."
                            maxLength={255}
                        />
                    </div>
                    <button
                                ref={btnRef}
                                className={`send-button ${sent ? 'success' : ''}`}
                                type="submit"
                            >
                                {sent ? '✓ Sent!' : 'Send'}
                            </button>               
         </form>
            </div>
        </section>
    )
}

export default Contact;