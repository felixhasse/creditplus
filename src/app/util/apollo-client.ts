import {ApolloClient, InMemoryCache} from "@apollo/client";
import {ApolloLink} from "apollo-link";
import {HttpLink} from "apollo-link-http";
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;


const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

const http = new HttpLink({
    uri: URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
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
