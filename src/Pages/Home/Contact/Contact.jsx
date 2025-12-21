import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <Mail className="text-primary" />,
      label: "Email Us",
      value: "ihaveawonderfull@gmail.com",
    },
    {
      icon: <Phone className="text-secondary" />,
      label: "Call Us",
      value: "+880 16021-807642",
    },
    {
      icon: <MapPin className="text-accent" />,
      label: "Office",
      value: "Gopalgonj",
    },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    Swal.fire({
    //   position: "top-end",
      icon: "success",
      title: "Your message is sened to office",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 my-text"
          >
            Get in Touch
          </motion.span>
          <p className="text-secondary max-w-lg mx-auto">
            Have a question or a project in mind? We'd love to hear from you.
            Our team usually responds within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* --- LEFT SIDE: INFO & SOCIALS --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="card my-bg text-primary-content shadow-2xl p-8 rounded-3xl h-full flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold my-text">
                  Contact Information
                </span>
                <div className="space-y-8 mt-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="bg-white/20 p-3 rounded-2xl">
                        {React.cloneElement(info.icon, {
                          size: 24,
                          className: "text-white",
                        })}
                      </div>
                      <div className="text-secondary">
                        <p className="text-sm opacity-70">{info.label}</p>
                        <p className="font-semibold">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <p className="text-sm mb-4 opacity-70">Follow our journey</p>
                <div className="flex gap-3">
                  {[<Twitter />, <Github />, <Linkedin />].map((icon, i) => (
                    <Link
                    onClick={() => {
                        alert('mama')
                    }}
                      key={i}
                      to={'https://github.com/rayhan309'}
                      className="btn btn-square btn-ghost bg-white/10 hover:bg-white/20 rounded-xl"
                    >
                      {React.cloneElement(icon, { size: 20 })}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT SIDE: THE FORM --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="card my-bg shadow-xl rounded-3xl p-8">
              <form className="space-y-6" onSubmit={handleSend}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="input input-bordered bg-base-200/40 focus:input-primary transition-all rounded-xl"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Last Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="input input-bordered bg-base-200/40 focus:input-primary transition-all rounded-xl"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Email Address</span>
                  </label>
                  <br />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="input input-bordered bg-base-200/40 focus:input-primary transition-all rounded-xl"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Subject</span>
                  </label>
                  <br />
                  <select className="select select-bordered bg-base-200/40 focus:select-primary rounded-xl">
                    <option disabled selected>
                      How can we help?
                    </option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing & Pricing</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Message</span>
                  </label>
                  <br />
                  <textarea
                    className="textarea textarea-bordered bg-base-200/40 focus:textarea-primary h-32 rounded-xl"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn bg-linear-to-r from-primary to-secondary border-none btn-block rounded-lg gap-2 shadow-lg shadow-primary/20"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>

              {/* Success Badge Suggestion */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-base-content/50">
                <MessageSquare size={14} />
                <span>By clicking send, you agree to our privacy policy.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
