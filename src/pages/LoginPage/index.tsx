import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../images/logo/logo.svg";
import axios from "axios";
import { AppContext } from "../../context";
import { Field, Form, Formik } from "formik";

export default function Login() {
  const { setToken } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <div className="flex h-[100vh] justify-between gap-12 p-[40px]">
      <div className="flex-1 bg-[url('/login-bg.svg')]">
        <NavLink
          to="/"
          className="mx-[auto] flex justify-start gap-2 text-center"
        >
          <img src={Logo} alt="Logo" width={"42.104px"} />
          <h3 className="text-gray-600 text-[17px] font-bold">Thawd</h3>
        </NavLink>

        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            setLoading(true);
            try {
              const res = await axios.post("/login", values);
              setToken(res.data.token);
              setLoading(false);

            } catch (err: any) {
              setErrors({password: err?.response?.data?.error || "Timeout"});
            }
          }}
        >
          {({ errors }) => (
            <Form className="mx-auto flex h-full w-[440px] flex-col items-center justify-center gap-10 text-start">
              <div className="w-full">
                <h2 className="text-[34px] font-bold leading-normal text-[#1A202C]">
                  Login
                </h2>
                <p className="text-[16px] text-[#4A5568]">Hi, Welcome back👋</p>
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-[16px] font-medium text-[#4A5568]"
                    >
                      Username
                    </label>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      className="rounded-[4px] border border-[#E2E8F0] px-[16px] py-[12px] text-[16px] font-medium text-[#1A202C] outline-offset-2 outline-[#743A8E]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="text-[16px] font-medium text-[#4A5568]"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="********"
                      className="rounded-[4px] border border-[#E2E8F0] px-[16px] py-[12px] text-[16px] font-medium text-[#1A202C] outline-offset-2 outline-[#743A8E]"
                    />
                  </div>

                  <p className="text-danger">{errors?.password}</p>
                  {/* <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="remember" id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-[16px] font-medium text-[#4A5568]"
                  >
                    Remember me
                  </label>
                </div>
                <NavLink
                  to="/forgot-password"
                  className="text-[16px] font-medium text-[#743A8E]"
                >
                  Forgot Password?
                </NavLink>
              </div> */}
                  <button
                    type="submit"
                    className="rounded-[4px] bg-[#743A8E] px-[16px] py-[12px] text-[16px] font-medium text-[#FFFFFF] transition duration-300 ease-in-out hover:bg-[#5F2D7F]"
                  >
{loading ?                     <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 mb-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg> : <></>}

                    Login

           
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <img
          src={"/login-banner.svg"}
          className="h-[100%] w-[100%] object-cover"
          alt="login-banner"
        />
      </div>
    </div>
  );
}
