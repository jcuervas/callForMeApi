import { createConnection, getConnection } from "typeorm";

export async function connect() {
  return getDefaultConnection();
}

async function getDefaultConnection() {
  let connection;
  try {
    connection = await getConnection();
    if (!connection.isConnected) {
      connection = await createConnection();
    }
  } catch (err) {
    connection = await createConnection();
  }
  return connection;
}
