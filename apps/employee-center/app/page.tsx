'use client'

import React, { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button, formFactory, FormSection, RichInput } from "@workspace/ui/components";

interface LoginForm {
  email: string
  password: string
}

const {Form, fields} = formFactory<LoginForm>({
  email: '',
  password: ''
})

const LoginPage: React.FC = () => {
  const searchParams = useSearchParams()
  const ref = useRef()

  const handleSubmit = (values: LoginForm) => {
    console.log({values})
  }

  //TODO: We have a login component on this dir root to deal with login stuff. Move this code there
  return (
      <div className="w-dvw h-dvh">
          <Form className="w-full h-full grid gap-4 justify-center" onSubmit={handleSubmit}>
    
            <FormSection className="self-end" >
              <FormSection.Title>Employee Login</FormSection.Title>

              <FormSection.Content>
                <RichInput
                  label="email"
                  name={fields.email.name} 
                  value={fields.email.default}
                  validator="email"
                  required
                />

                <RichInput
                  label="password"
                  name={fields.password.name}
                  value={fields.password.default}
                  required
                />
              </FormSection.Content>
            </FormSection>

            <Button className="self-start" type="submit">Sign In</Button>
          </Form>
      </div>
  )
}

export default LoginPage