'use client'

import React, { useEffect, useState } from 'react';
import useGetSetting from '@/app/_hooks/useGetSetting';
import useUtilsFunction from '@/app/_hooks/useUtilsFunction';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { notifySuccess, notifyError } from '@/app/_utils/toast';
import CustomerServices from '@/app/_services/CustomerServices';
import { useMutation } from '@tanstack/react-query';

interface FormData {
  name: string;
  lastName:string;
  email: string;
  address: string;
  phone: string;
  image: string;
}

type SessionUser = {
  id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  image?: string;
  address?: string;
  phone?: string;
};

type CustomSession = {
  user?: SessionUser;
  expires?: string;
  update?: (data?: any) => Promise<any>;
};

const UpdateProfile= () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, update } = useSession() as { data: CustomSession | null; update: (data?: any) => Promise<any> };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();


  const mutation = useMutation({
    mutationKey: ["updateCustomer"],
    mutationFn: async (data: FormData) => {
      if (!session?.user?.id) throw new Error("User ID not found");
      return await CustomerServices.updateCustomer(session.user.id, data);
    },
    onSuccess: async (_data, variables) => {
      notifySuccess("Profile Updated Successfully!");
      try {
        await update({
          user: {
            ...session?.user,
            name: variables.name,
            lastName: variables.lastName,
            address: variables.address,
            phone: variables.phone,
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

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await mutation.mutateAsync(data);
    } catch (err: any) {
      setLoading(false);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '');
      setValue('lastName', session.user.lastName || '');
      setValue('email', session.user.email || '');
      setValue('address', session.user.address || '');
      setValue('phone', session.user.phone || '');
    }
  }, [session, setValue]);



  return (
    <main className="main">
      <div className="card">
        <div className="card-header">
          <h5>Update Profile</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-md-6">
                <label>
                  First Name <span className="required">*</span>
                </label>
                <input className="form-control" {...register('name', { required: true })} type="text" />
              </div>

              <div className="form-group col-md-6">
                <label>
                  Last Name <span className="required">*</span>
                </label>
                <input className="form-control" {...register('lastName', { required: true })} type="text" />
              </div>
           
              <div className="form-group col-md-12">
                <label>
                  Phone <span className="required">*</span>
                </label>
                <input className="form-control" {...register('phone', { required: true })} type="text" />
              </div>
              <div className="form-group col-md-12">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <input className="form-control" {...register('email', { required: true })} type="email" />
              </div>
              <div className="col-md-12">
                <button className="btn btn-fill-out submit font-weight-bold" type="submit" disabled={loading}>
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;
