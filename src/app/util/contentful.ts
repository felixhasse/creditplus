import gql from "graphql-tag";
import apolloClient from "./apollo-client";

export async function getAllJobs() {
    let queryResult: any[] = [];
    let isFinished = false;
    let i = 0
    // Jobs are fetched in portions of 20 entries to not exceed maximum query complexity
    while (!isFinished) {
        const {data} = await apolloClient.query({
            query: gql`
                query{jobCollection(limit: 20, skip: ${20 * i}) {
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
        if (data.jobCollection.items.length === 0) {
            isFinished = true;
            break;
        }
        i += 1;
        queryResult = [...queryResult, ...data.jobCollection.items];
    }
    return queryResult;
}
