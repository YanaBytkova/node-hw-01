
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

function writeFile(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readFile();

  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readFile();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await readFile();
  const newContact = { id: crypto.randomUUID(), name, email, phone  };

  contacts.push(newContact);

  await writeFile(contacts);

  return newContact;
}

// async function update(id, contact) {
//   const contacts = await readFile();
//   const index = contacts.findIndex((contact) => contact.id === id);

//   if (index === -1) {
//     return undefined;
//   }

//   const newContact = { ...contact, id };
//   // const newBooks = [
//   //   ...books.slice(0, index),
//   //   newBook,
//   //   ...books.slice(index + 1),
//   // ];
//   contacts[index] = newContact;

//   await writeFile(contacts);

//   return newBook;
// }

async function removeContact(contactId) {
  const contacts = await readFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return undefined;
  }

  const newContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

  await writeFile(newContacts);

  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  // update,
  removeContact,
};