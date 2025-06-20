import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
dotenv.config();

const loader = new PDFLoader("sample-report.pdf");

const docs = await loader.load();

console.log(docs[1].pageContent);
