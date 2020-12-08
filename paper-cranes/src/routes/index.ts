/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-07
 */

/**
 * compose a paper crane  POST /api/paper-crane/
 * - need: title, content, style
 * search a paper crane  GET /api/paper-crane
 * read a paper crane  GET /api/paper-crane/:id
 * reply to a paper crane POST /api/paper-crane/:id
 * star, mark as unread a paper crane  PATCH /api/paper-crane/:id, body star + markUnread
 * delete paper crane DELETE /api/paper-crane/:id
 * get a list of paper cranes sent  GET /api/paper-crane/sent
 * get a list of paper cranes received  GET /api/paper-crane/received
 * get a list of unread paper cranes GET /api/paper-crane/unread
 */

export * from "./delete";
export * from "./read";
export * from "./compose";
export * from "./list";
export * from "./patch";
export * from "./reply";
export * from "./search";
