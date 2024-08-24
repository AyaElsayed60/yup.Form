import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import './ContactForm.css';

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  email: Yup.string().email("Please enter a valid email address").required("This field is required"),
  queryType: Yup.string().required("Please select a query type"),
  message: Yup.string().required("This field is required"),
  consent: Yup.boolean().oneOf([true], "To submit this form, please consent to being contacted"),
});

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      message: "",
      consent: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm(); // Clear the form data for a new user
      setTimeout(() => {
        alert("Message sent"); // Show alert after the form is cleared
      },500 ); // Delay the alert slightly to ensure the form is cleared first
    },
  });

  return (
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className={formik.touched.firstName && formik.errors.firstName ? 'error' : ''}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="error-message">{formik.errors.firstName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className={formik.touched.lastName && formik.errors.lastName ? 'error' : ''}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="error-message">{formik.errors.lastName}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? 'error' : ''}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label>Query Type *</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="queryType"
              value="General Enquiry"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.queryType === "General Enquiry"}
            />
            General Enquiry
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="queryType"
              value="Support Request"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.queryType === "Support Request"}
            />
            Support Request
          </label>
        </div>
        {formik.touched.queryType && formik.errors.queryType && (
          <div className="error-message">{formik.errors.queryType}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          className={formik.touched.message && formik.errors.message ? 'error' : ''}
        />
        {formik.touched.message && formik.errors.message && (
          <div className="error-message">{formik.errors.message}</div>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="consent"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.consent}
          />
          I consent to being contacted by the team *
        </label>
        {formik.touched.consent && formik.errors.consent && (
          <div className="error-message">{formik.errors.consent}</div>
        )}
      </div>

      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;