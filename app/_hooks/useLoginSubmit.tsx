
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, Control, FieldErrors } from "react-hook-form";
import { signIn } from "next-auth/react";

// Internal imports
import { notifyError, notifySuccess } from "@/app/_utils/toast";
import CustomerServices from "@/app/_services/CustomerServices";
import { useMutation } from "@tanstack/react-query";

interface FormValues {
  name?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

interface UseLoginSubmitProps {
  redirectUrl?: string | null;
}


const useLoginSubmit = () => {

  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const redirectUrl = useSearchParams().get("redirectUrl");
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues>();


    
  const registerMutation = useMutation({
    mutationKey: ["registerCustomer"],
    mutationFn: async ({ name, email, password }: FormValues) => {
      return await CustomerServices.registerCustomer({ name, email, password });
    },
    onSuccess: async (data) => {
      notifySuccess(data.message || "Registration successful!");
      if (data?.email && data?.password) {
        const signInRes = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInRes?.ok) {
          router.push("/");
        } else {
          notifyError("Sign-in failed. Please try manually.");
          router.push("/auth/login");
        }
      }
    },
    onError: (error: { response: { data: { message: any; }; }; message: any; }) => {
            notifyError(
              error.response?.data?.message ||
                error.message ||
                "An error occurred during email verification."
            );
    },
  });




  const submitHandler = async ({ name, email, password, phone }: FormValues) => {
    setLoading(true);
    
    try {
      if (pathname === "/auth/register") {
        registerMutation.mutate({ name, email, password }); 
        return setLoading(false);
      } else if (pathname === "/auth/forget-password") {
        const res = await CustomerServices.forgetPassword({ email });
        notifySuccess(res.message);
        return setLoading(false);
      } else if (pathname === "/auth/phone-signup") {
        const res = await CustomerServices.verifyPhoneNumber({ phone });
        notifySuccess(res.message);
        return setLoading(false);
      } else {


        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          //callbackUrl: "/user/dashboard",
        });

        

        if (result?.error) {
          notifyError(result?.error);
          setLoading(false);
        } else if (result?.ok) {
          notifySuccess("Login successful!");
          const url = redirectUrl ? "/checkout" :  "/";
          router.push(url);
          setLoading(false);
        }
      }
    } catch (error: any) {
      //console.error("Error in submitHandler:", error?.response?.data?.message || error?.message);
      setLoading(false);
      notifyError(error?.response?.data?.message || error?.message);
    }
  };

  return {
    register,
    errors,
    loading,
    control,
    handleSubmit,
    submitHandler,
    watch
  };


};

export default useLoginSubmit;