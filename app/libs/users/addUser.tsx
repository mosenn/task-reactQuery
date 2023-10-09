export const addUser = async (NewUserdata: any) => {
  console.log(NewUserdata, " NewUserdata in add user function query file");
  const { name, email, phone } = NewUserdata;
  // console.log(name, email, phone);
  const data = await fetch(`${process.env.NEXT_PUBLIC_ENV_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
    }),
  });

  const res = await data.json();
  console.log(res);
  return res;
};
