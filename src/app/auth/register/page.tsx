import RegisterForm from "./registerForm";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Create your account
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
