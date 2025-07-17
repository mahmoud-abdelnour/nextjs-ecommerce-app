'use client'

import React, { useState , useEffect} from 'react'
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { notifySuccess, notifyError } from '@/app/_utils/toast';
import { useMutation } from '@tanstack/react-query';
import CustomerServices from '@/app/_services/CustomerServices';
import { getUserSession } from '@/app/_lib/auth';

interface ChangePasswordFormData {
  streetAddress?: string;
  cityAddress?: string;
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

type UserInfo = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  streetAddress?: string;
  cityAddress?: string;
};

const Address: React.FC = () => {
  const userInfo = getUserSession() as UserInfo;

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
      return await CustomerServices.updateAddress(data);
    },
    onSuccess: async (_data, variables) => {
      notifySuccess("Password Updated Successfully!");
      try {
           await update({
          user: {
            ...session?.user,
            streetAddress: variables.streetAddress,
            cityAddress: variables.cityAddress,
          }
        });
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
    setValue("streetAddress", userInfo?.streetAddress ?? undefined);
    setValue("cityAddress", userInfo?.cityAddress ?? undefined);
  }, [userInfo]);


  return (
  <main className="main">
    <div className="card">
        <div className="card-header">
          <h5>Address</h5>
        </div>
        <div className="card-body">
          <form   onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-md-6">
                <label>
                  Street Address <span className="required">*</span>
                </label>
                <input className="form-control"  required type="text"    {...register('streetAddress', { required: true })} />
              </div>
              <div className="form-group col-md-6">
                <label>
                  City <span className="required">*</span>
                </label>
                <input className="form-control"  required {...register('cityAddress', { required: true })}  />
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
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Address
