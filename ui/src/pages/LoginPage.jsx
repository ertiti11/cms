import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useEffect} from "react";

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      useEffect(() => {
        document.title = "Login";
      }, []);
    
      
      const navigate = useNavigate();
      const onSubmit = handleSubmit((data) => {
        console.log(data);
      });
    
      // MIRARRRRr  ñljñlakjsdñlkfjasñldkfjañslkdjf
      useEffect(() => {
        if (window.localStorage.getItem("pocketbase_auth")) {
          navigate("/quest");
        }
      }, [navigate]);
    
      ////////////////////////////////////////
    
    //   useEffect(() => {
    //     if (user) navigate("/");
    //   }, [navigate, user]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/user-male-circle--v1.png"
            alt="user-male-circle--v1"
            className="mr-4"
          />
          Login
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {/* {error && <ErrorModal isOpen={true} onClose={false} text={error} />} */}

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={onSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                {errors.username && (
                  <span className="text-red-500">This field is required</span>
                )}
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="test@email.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label
                  type="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-slate-50 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400"></p>
              <div className="flex items-center">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                    <span className="mx-4 dark:text-white text-gray-800  font-semibold">OR</span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>
              <div>
                <Link
                  to={"/register"}
                  className="flex items-center justify-center w-full px-4 py-2 mt-2 space-x-3 text-sm text-center bg-blue-600 text-white transition-colors duration-200 transform  rounded-lg dark:text-gray-300 dark:border-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  <span className="text-sm text-white dark:text-gray-200">
                    Iniciar sesión con Facebook
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
