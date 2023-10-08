import { getUsers } from "../querys/users";
import { useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const usePagenation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const perPage = searchParams.get("perPage") ?? 5;

  const users = (page = 1) => getUsers(page, perPage);

  const { isLoading, data } = useQuery(["users", page, perPage], () =>
    users(+page)
  );

  const nextPage = async () => {
    const nextPageData = await users(+page + 1);
    if (nextPageData.length > 0) {
      router.push(`/?page=${+page + 1}&perPage=${perPage}`);
    }
  };

  const prevPage = () => {
    if (+page > 1) {
      router.push(`/?page=${+page - 1}&per_page=${perPage}`);
    }
  };
  return { nextPage, prevPage, data, isLoading, page, perPage };
};

export default usePagenation;
