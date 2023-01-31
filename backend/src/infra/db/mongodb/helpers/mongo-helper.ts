import { Collection, MongoClient } from 'mongodb'

class MongoHelpers {
  private client: MongoClient
  private URL: string

  async connect (URL: string): Promise<void> {
    this.client = await MongoClient.connect(URL)
    this.URL = URL
  }

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  }

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.URL)
    }
    return new Promise(resolve => resolve(this.client.db().collection(name)))
  }

  mapToEntity (account: any): any {
    const { _id, ...collectionWithoutId } = account
    return Object.assign(
      {},
      collectionWithoutId,
      { id: _id.toHexString() }
    )
  }
}

export const MongoHelper = new MongoHelpers()
