import { Driver, Session, auth, driver } from 'neo4j-driver';

export class Neo4jConnection {
    private static instance: Neo4jConnection | null = null;

    driver: Driver;

    constructor(uri: string, user: string, password: string) {
        this.driver = driver(uri, auth.basic(user, password));
    }

    // Get the singleton instance
    public static getInstance(
        uri: string,
        user: string,
        password: string
    ): Neo4jConnection {
        if (!Neo4jConnection.instance) {
            Neo4jConnection.instance = new Neo4jConnection(uri, user, password);
        }
        return Neo4jConnection.instance;
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
            await session.run(query, parameters);
        } finally {
            await session.close();
        }
    }
}
