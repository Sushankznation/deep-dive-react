// This file contains the CRUD operation for our blog apps,
// Prefer Appwrite Docs for any changes and update
import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Errro ", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error in getting post", error);
      return false;
    }
  }
}
const service = new Service();
export default service;
