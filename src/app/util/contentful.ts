import gql from "graphql-tag";
import apolloClient from "./apollo-client";

export async function getAllJobs() {
    console.log(apolloClient.link);
    const {data} = await apolloClient.query({
        query: gql`
            query{   jobCollection(limit: 20) {
                items {
                    name
                    title
                    type {
                        title
                    }
                    department {
                        title
                    }
                    levelsCollection {
                        items {
                            title
                        }
                    }
                    locationsCollection {
                        items {
                            city
                        }
                    }

                }
            }
            }

        `,
    });
    console.log(data.jobCollection.items);
    return data.jobCollection.items;
}
