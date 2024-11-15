import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      email
      firstName
      lastName
      password
      subscriptionCount
      subscriptions {
        _id
        name
        dateCreated
        price
        tiered
        url
        cardAlias
        billingCycle
      }
      watchList {
        _id
        name
        tmdbId
        providers
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      email
      firstName
      lastName
    }
  }
`;
