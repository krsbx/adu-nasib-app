import { RESOURCE_NAME, USER_ROLE } from './constant';

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];

export type ResourceName = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

export type Profile = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  userId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profile?: Profile;
};

export type Post = {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export type Comment = {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export type ResourceMap = {
  [RESOURCE_NAME.USER]: User;
  [RESOURCE_NAME.POST]: Post;
  [RESOURCE_NAME.COMMENT]: Comment;
};

export type ResourceStructure<T extends ResourceName> = {
  rows: {
    [id: number]: ResourceMap[T];
  };
  count: number;
};

export type Resources = {
  [RESOURCE_NAME.USER]: ResourceStructure<typeof RESOURCE_NAME.USER>;
  [RESOURCE_NAME.POST]: ResourceStructure<typeof RESOURCE_NAME.POST>;
  [RESOURCE_NAME.COMMENT]: ResourceStructure<typeof RESOURCE_NAME.COMMENT>;
};
