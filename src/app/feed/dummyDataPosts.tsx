export interface DummyPostDataType {
  id: number;
  createdById: string;
  createdAt: string;
  updatedAt: number;
  image: string;
  caption: string;
}

export const DummyPostData: DummyPostDataType[] = [
  {
    id: 1,
    createdById: "musclemushroom123",
    createdAt: "30 June 2024",
    updatedAt: 3,
    image:
      "https://static.vecteezy.com/system/resources/previews/023/506/852/non_2x/cute-kawaii-mushroom-chibi-mascot-cartoon-style-vector.jpg",
    caption: "good legs day!!!!",
  },
  {
    id: 2,
    createdById: "hellenmellon",
    createdAt: "30 June 2024",
    updatedAt: 5,
    image:
      "https://wallpapers-clan.com/wp-content/uploads/2022/05/cute-pfp-07.jpg",
    caption: "CARDIO",
  },
  {
    id: 2,
    createdById: "joshlimmy",
    createdAt: "30 June 2024",
    updatedAt: 7,
    image:
      "https://wallpapers-clan.com/wp-content/uploads/2023/12/cute-cat-in-custume-pfp-01.jpg",
    caption: "quick bicep sesh",
  },
];
