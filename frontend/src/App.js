import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", skills: "", role: "" });
  const [applicants, setApplicants] = useState([]);
  const [viewAdmin, setViewAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/applicants", form);
    setForm({ name: "", email: "", skills: "", role: "" });
    setShowModal(true);
  };

  useEffect(() => {
    if (viewAdmin) {
      axios.get("http://localhost:5000/api/applicants").then((res) => setApplicants(res.data));
    }
  }, [viewAdmin]);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">
            Intern Portal
          </a>
          <div>
            <button
              onClick={() => setViewAdmin(false)}
              className={`btn me-2 ${!viewAdmin ? "btn-light" : "btn-outline-light"}`}
            >
              Home
            </button>
            <button
              onClick={() => setViewAdmin(true)}
              className={`btn ${viewAdmin ? "btn-light" : "btn-outline-light"}`}
            >
              Admin View
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container flex-grow-1 my-5">
        <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
          <div className="card-body">
            {!viewAdmin ? (
              <>
                <h3 className="mb-4 text-center text-primary">Register</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Skills</label>
                    <input
                      type="text"
                      name="skills"
                      value={form.skills}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Role (Intern/Volunteer)</label>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Submit Application
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="mb-4 text-center text-secondary">Applicants</h3>
                <ul className="list-group">
                  {applicants.map((a, i) => (
                    <li key={i} className="list-group-item">
                      <strong>{a.name}</strong>
                      <br />
                      {a.email}
                      <br />
                      {a.skills}
                      <br />
                      <small className="text-muted">{a.role}</small>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <div className="container">
          &copy; {new Date().getFullYear()} Intern Portal. All Rights Reserved.
        </div>
      </footer>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for registering! Your application has been submitted.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
