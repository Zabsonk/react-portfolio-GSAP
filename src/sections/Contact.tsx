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

        emailjs
            .sendForm(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                formRef.current,
                'YOUR_USER_ID_OR_PUBLIC_KEY'
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

            <button className="return-button" onClick={onButtonClick}>Return Home</button>
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
                            Message
                        </p>
                        <input type="text" className={'form-message'} name="message" id="name" placeholder="Write your message here..."/>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    )
}

export default Contact;