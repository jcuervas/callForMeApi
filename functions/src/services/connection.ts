import {Connection, createConnection, getConnection} from "typeorm";
import {environment} from "../../config/environment";

export async function connect(name: string | null = null) {
  if (name) {
    return await getNamedConnection(name);
  } else {
    return await getDefaultConnection();
  }
}

async function getNamedConnection(name: string): Promise<Connection> {
  let connection;
  try {
    connection = await getConnection(name);
    if (!connection.isConnected) {
      connection = await createConnection(name);
    }
  } catch (err) {
    try {
      connection = await createConnection(name);
    } catch (e) {
      connection = await getDefaultConnection();
    }
  }
  return connection;
}

async function getDefaultConnection() {
  let connection;
  try {
    connection = environment === 'local' ? await getConnection(environment) : await getConnection();
    if (!connection.isConnected) {
      connection = environment === 'local' ? await createConnection(environment) : await createConnection();
    }
  } catch (err) {
    connection = environment === 'local' ? await createConnection(environment) : await createConnection();
  }
  return connection;
}
