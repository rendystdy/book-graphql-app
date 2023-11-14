import { gql } from "@apollo/client";

export const GET_PHOTOS = gql`
query($options: PageQueryOptions) {
  photos(options: $options) {
    data {
      id
      title
      url
      thumbnailUrl
    }
    meta {
      totalCount
    }
  }
}
`;

export const OPTIONS_PHOTOS = {
  "options": {
    "paginate": {
      "page": 1,
      "limit": 20
    }
  }
};