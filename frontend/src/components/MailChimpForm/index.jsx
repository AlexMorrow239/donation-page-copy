import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

const url =
  "https://captainfanplastic.us2.list-manage.com/subscribe/post?u=a509425913b0df961c921bc44&amp;id=59c8915fa9&amp;f_id=00e7cbe3f0";
const CustomForm = ({ status, message, onValidated }) => {
  let email;

  const submit = () => {
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });
  };

  return (
    <div>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div style={{ color: "green" }}>Subscribed!</div>
      )}
      <input
        ref={(node) => (email = node)}
        type="email"
        placeholder="Your email"
        className="d-block"
      />
      <button onClick={submit} className="btn btn-soapboxblue mt-3 btn-sm">
        SUBSCRIBE
      </button>
    </div>
  );
};

const MailchimpForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <CustomForm
        status={status}
        message={message}
        onValidated={(formData) => subscribe(formData)}
      />
    )}
  />
);

export default MailchimpForm;
