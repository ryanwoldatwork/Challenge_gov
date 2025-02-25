import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { ApiUrlContext } from "../../ApiUrlContext";

export const ContactForm = ({ challenge, preview }) => {
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false)

  const { apiUrl } = useContext(ApiUrlContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post(apiUrl + `/api/challenges/${challenge.id}/contact_form`, { email, body })
      .then((res) => {
        setIsOpen(true)
        setEmail('')
        setBody('')
        setErrors({})
      })
      .catch((e) => {
        let error = e.response.data.errors
        setErrors(error)
      })
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <section className="challenge-tab container">
        <div className="challenge-tab__header">Contact</div>
        <hr />
        <div className="contact-form__wrapper">
          <div className="mb-5">
            Have a question or comment about this challenge? Reach out by
            completing the form below.
          </div>
          <form className="usa-form w-100" onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                className="usa-label"
                htmlFor="contactEmail"
              >
                Email address <span>*</span>
              </label>
              <input
                id="contactEmail"
                className={`usa-input ${errors.email ? "is-invalid" : ""}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={preview}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label
                className="usa-label"
                htmlFor="contactBody"
              >
                Question or comment <span>*</span>
              </label>
              <textarea
                id="contactBody"
                className={`usa-textarea ${errors.body ? "is-invalid" : ""}`}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={preview}
                required
              />
              {errors.body && (
                <div className="invalid-feedback">{errors.body}</div>
              )}
            </div>
            <button
              className="contact-form__submit usa-button"
              disabled={preview}
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <Modal isOpen={modalIsOpen}>
        <ModalBody>
          Your message has been received. Check your email for confirmation
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};