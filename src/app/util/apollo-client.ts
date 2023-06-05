import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import {accessToken, spaceId, environment} from "../../../config";

const URL = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`;

const http = new HttpLink({
    uri: URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

const link = ApolloLink.from([http]);

const cache = new InMemoryCache();

// @ts-ignore
const apolloClient = new ApolloClient({
    link,
    cache,
});

export default apolloClient;
