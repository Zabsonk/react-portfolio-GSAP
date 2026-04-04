import {useRef} from "react";
import emailjs from 'emailjs-com';

type Props = {
    onButtonClick: () => void;
};

const Contact = ({onButtonClick}: Props) => {
    const formRef = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        formData.forEach((value, key) => console.log(key, value));
        emailjs
            .sendForm(
                'service_iqd6gpy',
                'template_u7vb1c1',
                formRef.current,
                'bdiI2UsT6xOIiPW3g'
            )
            .then(
                (result) => {
                    console.log('Success:', result.text);
                    alert("Message sent!");
                    formRef.current?.reset();
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
                        <input type="text" name="name" id="name" placeholder="Your name"/>
                    </div>

                    <div className={'form-part'}>
                        <p>
                        Email
                        </p>
                        <input type="email" name="email" id="email" placeholder="your@email.com"/>
                    </div>
                    <div className={'form-part'}>
                        <p>
                            Subject
                        </p>
                        <input type="text" name="title" id="title" placeholder="Message Subject"/>
                    </div>
                    <div className={'form-part'}>
                        <p>
                            Message
                        </p>
                        <input type="text" className={'form-message'} name="message" id="message" placeholder="Write your message here..."/>
                    </div>
                    <button className={"send-button"} type="submit">Send</button>
                </form>
            </div>
        </section>
    )
}

export default Contact;