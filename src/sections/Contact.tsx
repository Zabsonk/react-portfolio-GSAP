type Props = {
    onButtonClick: () => void;
};

const Contact = ({onButtonClick}: Props) => {

    return(
        <section className="contact">
            <button className="return-button" onClick={onButtonClick}>Return Home</button>
            <form className={'contact-form'}>

            </form>
        </section>
    )

}

export default Contact;