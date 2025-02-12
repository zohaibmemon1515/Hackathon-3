const userSchema = {
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "string",
    },
  ],
};

export default userSchema;
