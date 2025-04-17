export interface LinkItem {
  title: string;
  link: string;
}

export interface UserProfileType {
  id: number;
  nickName: string;
  role?: string;
  profileImage?: string;
  introduction?: string;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  career?: string;
  links?: LinkItem[];
}
