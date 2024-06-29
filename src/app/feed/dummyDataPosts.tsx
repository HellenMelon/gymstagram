export interface DummyPostDataType {
  id: number;
  createdById: number;
  createdAt: number;
  updatedAt: number;
  image: string;
  caption: string;
}

export const DummyPostData: DummyPostDataType[] = [
  {
    id: 1,
    createdById: 1,
    createdAt: 3,
    updatedAt: 3,
    image:
      "https://static.vecteezy.com/system/resources/previews/023/506/852/non_2x/cute-kawaii-mushroom-chibi-mascot-cartoon-style-vector.jpg",
    caption: "heyyyyy",
  },
  {
    id: 2,
    createdById: 1,
    createdAt: 5,
    updatedAt: 5,
    image:
      "https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-07.jpg",
    caption: "yoooo",
  },
  {
    id: 2,
    createdById: 1,
    createdAt: 7,
    updatedAt: 7,
    image:
      "https://wallpapers-clan.com/wp-content/uploads/2023/12/cute-cat-in-custume-pfp-01.jpg",
    caption: "damnnnnn",
  },
];
