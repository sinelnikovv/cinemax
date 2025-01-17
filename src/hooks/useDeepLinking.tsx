import { useEffect } from "react";

import branch from "react-native-branch";

import { Routes } from "@src/navigation/routes";
import { navigate } from "@src/utils/navigation";

const useDeepLinking = () => {
  useEffect(() => {
    branch.subscribe({
      onOpenComplete: (params) => {
        if (params?.params?.["$canonical_identifier"]) {
          navigate(Routes.Movie, {
            id: params?.params?.["$canonical_identifier"],
          });
        } else if (
          params?.error?.startsWith(
            "Warning. Session initialization already happened.",
          )
        ) {
          branch.getLatestReferringParams().then((params) => {
            setTimeout(() => {
              params?.["$canonical_identifier"] &&
                navigate(Routes.Movie, {
                  id: +params?.["$canonical_identifier"],
                });
            }, 2000);
          });
        }
      },
    });
  }, []);
};

export default useDeepLinking;
