import { Driver, Session, auth, driver } from 'neo4j-driver';

export class Neo4jConnection {
    driver: Driver;

    constructor(uri: string, user: string, password: string) {
        this.driver = driver(uri, auth.basic(user, password));
    }

    close(): void {
        this.driver.close();
    }

    async runQuery(
        query: string,
        parameters: Record<string, any> = {}
    ): Promise<void> {
        const session: Session = this.driver.session();
        try {
            await session.executeWrite((tx) => tx.run(query, parameters));
        } finally {
            await session.close();
        }
    }
}
