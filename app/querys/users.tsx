const url = `https://63d108283f08e4a8ff8ef010.mockapi.io`;

export const getUsers = async () => {
  const data = await fetch(`${url}/users`);
  // console.log(await data.json(), "data in the function");
  return await data.json();
};

export const user = async (id: string) => {
  const data = await fetch(`${url}/users/${id}`);
  const response = await data.json();
  return response;
};
export const addUser = async (NewUserdata: any) => {
  console.log(NewUserdata, " NewUserdata in add user function query file");
  const { name, email, phone } = NewUserdata;
  // console.log(name, email, phone);
  const data = await fetch(`${url}/users`, {
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

export const deleteUser = async (id: string) => {
  console.log(id, "id in delete user function");
  const data = await fetch(`${url}/users/${id}`, {
    method: "DELETE",
  });
  console.log(await data.json(), "delete data");
};

type user = { name: string; phone: string; email: string; id?: string };

export const updateUser = async (user: user) => {
  const data = await fetch(`${url}/users/${user.id} `, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...user }),
  });
  const res = await data.json();
  console.log(res, "user is update response");
  return res;
};
