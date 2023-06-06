import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {ApolloLink} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {onError} from "@apollo/client/link/error";

const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;


const URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

const http = createHttpLink({
    uri: URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});



const cache = new InMemoryCache();

// @ts-ignore
const apolloClient = new ApolloClient({
    link: errorLink.concat(http),
    cache,
});
export default apolloClient;
