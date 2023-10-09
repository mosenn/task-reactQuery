console.log(process.env.NEXT_PUBLIC_ENV_API_URL);
const url = "https://63d108283f08e4a8ff8ef010.mockapi.io";
export const Users = async (
  page: string | number,
  perPage: string | number
) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_ENV_API_URL}/users?page=${page}&limit=${perPage}`);
  const res = await data.json();
  console.log(res);
  return res;
};
