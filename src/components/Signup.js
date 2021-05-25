import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"


function Signup(props) {
  // Form's ref
  const emailRef = useRef(); 
  const passwordRef = useRef(); 
  const passwordConfirmRef = useRef(); 
  // State
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordConfirmRef.target.value !== passwordRef.target.value) {
      return setError("Password do not match")
    }

    try {

      await signup(emailRef.current.value, passwordRef)

    } catch (error) {
      
      setError("Failed to create account")

    }

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form>
            {/* Email */}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            {/* Password */}
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            {/* Password Confirmation */}
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            {/* Submit Button */}
            <Button disabled={loading} type="submit" className="w-100 mt-3">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">

      </div>
    </>
  );
}
export default Signup;
