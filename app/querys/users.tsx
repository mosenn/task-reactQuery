const url = `https://63d108283f08e4a8ff8ef010.mockapi.io`;

export const getUsers = async () => {
  const data = await fetch(`${url}/users`);
  // console.log(await data.json(), "data in the function");
  return await data.json();
};

export const addUser = async (NewUserdata: any) => {
  console.log(NewUserdata, " NewUserdata in add user function query file");
  const { name, email, phone } = NewUserdata;
  console.log(name, email, phone);
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
  // console.log("function is work");
  // console.log("user id for update", user.id);
  // console.log(user, "user peroperty");
  const { id, name, phone, email } = user;
  // console.log(id);
  // console.log(name);
  // console.log(phone);
  // console.log(email);
  const data = await fetch(`${url}/users/${user.id} `, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      name,
      email,
      phone,
    }),
  });
  const res = await data.json();
  console.log(res, "user is update response");
  return res;
};