'use client'

import React, { useState , useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { notifySuccess, notifyError } from '@/app/_utils/toast';
import { useMutation } from '@tanstack/react-query';
import CustomerServices from '@/app/_services/CustomerServices';
import { getUserSession } from '@/app/_lib/auth';

interface ChangePasswordFormData {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}

type SessionUser = {
  id?: string;
};

type CustomSession = {
  user?: SessionUser;
  expires?: string;
  update?: (data?: any) => Promise<any>;
};

const ChangePassword = () => {
  const userInfo = getUserSession();

  const { data: session, update } = useSession() as { data: CustomSession | null; update: (data?: any) => Promise<any> };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();
  const [loading, setLoading] = useState<boolean>(false);



  
  const mutation = useMutation({
    mutationKey: ["ChangePassword"],
    mutationFn: async (data: ChangePasswordFormData) => {
      if (!session?.user?.id) throw new Error("User ID not found");
     
      return await CustomerServices.changePassword(data);
    },
    onSuccess: async (_data, variables) => {
      notifySuccess("Password Updated Successfully!");
      try {
        
      } catch (updateError) {
        console.error("Failed to update session:", updateError);
      }
      setLoading(false);
    },
    onError: (error: any) => {
      notifyError(error?.response?.data?.message || error?.message);
      setLoading(false);
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setLoading(true);
      await mutation.mutateAsync(data);
    } catch (err: any) {
      setLoading(false);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    setValue("email", userInfo?.email ?? undefined);
  }, [userInfo]);



  return (
    <main className="main">
    
    <div className="card">
        <div className="card-header">
          <h5>Change Password</h5>
        </div>
        <div className="card-body">
         
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group col-md-12">
                <label>
                  Current Password <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  required
                  type="password"
                  {...register('currentPassword', { required: true })}
                />
              </div>
              <div className="form-group col-md-12">
                <label>
                  New Password <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  required
                  type="password"
                  {...register('password', { required: true })}

                />
              </div>
              <div className="form-group col-md-12">
                <label>
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  required
                  type="password"
                  {...register('confirmPassword', { required: true })}

                />
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-fill-out submit font-weight-bold"
                  name="submit"
                  type="submit"
                  value="Submit">
                  Save Change
                </button>
              </div>
          </form>
        </div>
      </div>
    </main>

  )
}

export default ChangePassword
