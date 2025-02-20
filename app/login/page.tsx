import AuthForm from "@/components/AuthForm"


const LoginPage = () => {
  return (
    <div className="w-full h-full dark:bg-black bg-gray-200">
      <AuthForm mode="login" />
    </div>
  )
}

export default LoginPage