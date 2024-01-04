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
      return await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error in getting post", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries,
        100,
        0
      );
    } catch (error) {
      console.log("Error in getting List Posts at getPOsts Methods : ", error);
      return false;
    }
  }
  //File upload services
  async uploadFile(file) {
    try {
      return await this.databases.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error in uploadingFile", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.databases.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Erorr Found in Delete File at deleteFile : ", error);
      return false;
    }
  }
  async previewFile(fileId) {
    return await this.databases.getFilePreview(config.appWriteBucketId, fileId);
  }
}
const service = new Service();
export default service;
