// styled components
import {
  StyledTextInput,
  StyledFormArea,
  StyledFormButton,
  StyledLabel,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink,
  CopyrightText,
} from "./../components/Styles";

import Logo from "./../assets/logo.png";

// formik
import { Formik, Form } from "formik";
import { TextInput } from "./../components/FormLib";
import * as Yup from "yup";

//icons
import { FiMail, FiLock, FiUser, FiCalendar } from "react-icons/fi";

// Loader
import Loader from "react-loader-spinner";

// auth & redux
import { connect } from "react-redux";
import { signupUser } from "./../auth/actions/userActions";
import { useHistory } from "react-router-dom";

const Signup = ({ signupUser }) => {
  const history = useHistory();
  return (
    <div>
      <StyledFormArea>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          Member Signup
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
            dateOfBirth: "",
            name: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required"),
            name: Yup.string().required("Required"),
            dateOfBirth: Yup.date().required("Required"),
            repeatPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("password")], "Passwords must match"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            signupUser(values, history, setFieldError, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="name"
                type="text"
                label="Full Name"
                placeholder="Olga Simpson"
                icon={<FiUser />}
              />
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="olga1@example.com"
                icon={<FiMail />}
              />
              <TextInput
                name="dateOfBirth"
                type="date"
                label="Date of Birth"
                icon={<FiCalendar />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <TextInput
                name="repeatPassword"
                type="password"
                label="Repeat Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit">Signup</StyledFormButton>
                )}

                {isSubmitting && (
                  <Loader
                    type="ThreeDots"
                    color={colors.theme}
                    height={49}
                    width={100}
                  />
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Already have an account? <TextLink to="/login">Login</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All rights reserved &copy;2020</CopyrightText>
    </div>
  );
};

export default connect(null, { signupUser })(Signup);
