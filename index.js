const Contacts = require("./db/contacts");
const { program } = require("commander");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        const contacts = await  Contacts.listContacts();
        return console.log(contacts);
      case "get":
        const contact = await  Contacts.getContactById(id);
        return console.log(contact);
      case "add":
        const createdContact = await Contacts.addContact(name, email, phone);
        return console.log("You created next new contact: ", createdContact);
    
      case "remove":
        const removedContact = await Contacts.removeContact(id);
        return console.log("This contact was removed: ", removedContact);
      default:
        console.log("Unknown action:(");
    }
  }
  
  program
    .option("-action, --action <action>", "Action to invoke")
    .option("-i, --id <id.toString>", "Contact id")
    .option("-n, --name <name>", "Contact name")
    .option("-e, --email <email>", "Contact email")
    .option("-ph, --phone <phone>", "Contact phone number")
  
  program.parse(process.argv);
  
  const options = program.opts();
  
  invokeAction(options);


// SHOW all contacts
// contacts
//   .listContacts()
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
// SHOW contact by ID
//   contacts
//   .getContactById('e6ywwRe4jcqxXfCZOj_1e')
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// SHOW deleted contact
// contacts
//   .removeContact('AeHIrLTr6JkxGE6SN-0Rw')
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

//SHOW added contact
// contacts
//   .addContact('Alexander McQueen', 'alex@alexmcque.com', '(066) 123-9384')
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

