import { useQuery } from "@tanstack/react-query";
import { http } from "../http";

export type IFile = {
  name : string;
  isDir : number;
  icon : string;
};

type IUseGetListData = {
  results : IFile;
}

type IUseGetListDir = {
  data: IUseGetListData;
  loading: boolean;
  error: unknown;
};

const getListDir = async () => {
  const response = await http.get("/getListDir");
  return response.data;
};

export const useGetListDir = (): IUseGetListDir => {
  const { data, isLoading, error } = useQuery(["getListDir"], () =>
    getListDir()
  );
  return { data: data, loading: isLoading, error: error };
};
