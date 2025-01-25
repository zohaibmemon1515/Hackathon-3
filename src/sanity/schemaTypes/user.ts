import { Rule } from 'sanity';

const userSchema = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email().error('Please provide a valid email'),
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      hidden: true,
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('User ID is required'),
    },
  ],
};

export default userSchema;
