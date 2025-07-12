import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SettingServices from "@/app/_services/SettingServices";

const useGetSetting = () => {
  const lang = Cookies.get("_lang");

  const { data: globalSetting } = useQuery({
    queryKey: ["globalSetting"],
    queryFn: async () => await SettingServices.getGlobalSetting(),
    staleTime: 10 * 60 * 1000, //cache for 10minutes
    gcTime: 15 * 60 * 1000,
  });

  const {
    data,
    error,
    isFetched,
    isLoading: loading,
  } = useQuery({
    queryKey: ["storeCustomization"],
    queryFn: async () => await SettingServices.getStoreCustomizationSetting(),
    staleTime: 20 * 60 * 1000, //cache for 20 minutes,
    gcTime: 25 * 60 * 1000,
  });


  useEffect(() => {
    if (isFetched && data) {
    } else {

    }

    if (!lang) {
      Cookies.set("_lang", "en", {
        sameSite: "None",
        secure: true,
      });
    }
  }, [data, isFetched, lang]);

  return {
    lang,
    error,
    loading,
    globalSetting
  };
};

export default useGetSetting;
