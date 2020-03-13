import React from 'react';
import './App.css';
import blogIcon from './assets/blog-icon.png';
import {Contact} from './Contact';
import DisplaySelectedContact from './DisplaySelectedContact';
import DetailsForm from './DetailsForm';
import ContactsList from './ContactsList';

var contacts : any = [];
var contact : Contact = new Contact(2,"chandermani.a@gmail.com","Chandermani","9703506166","123456789","www.teemad.com","Seattle");
contacts.push(contact);
contact = new Contact(1,"sashi.p@technovert.net","Sashi Pagadala","8919747429","12345678","www.technovert.com","Hyderabad");
contacts.push(contact);

class Home extends React.Component<any,any>{
  actionSelected: any;
  selectedId: number = -1;
  constructor(props : any)
  {
    super(props);
    this.state = {viewForm : false, shouldDisplaySelectedContact : false, displayAllContacts : true};
    this.addContact = this.addContact.bind(this);
    this.home = this.home.bind(this);
  }

  addContact(event : any)
  {
    event.preventDefault();
    this.actionSelected = <DetailsForm contacts={contacts} onContactUpsert={this.onContactUpsert}  />
    this.setState({viewForm : true, shouldDisplaySelectedContact : false});
  }

  editContact : any = (contact : Contact)=>
  {
    this.actionSelected = <DetailsForm action="Update" contact={contact} contacts={contacts} onContactUpsert={this.onContactUpsert} />;
    this.setState({viewForm : true, shouldDisplaySelectedContact : false});
  }

  deleteContact : any = (contact : Contact) =>
  {
    var index = contacts.findIndex((obj: { id: number; }) =>obj.id=== contact.id);
    contacts.splice(index,1);
    if(index!=contacts.length)
    {
      for(var i=index;i<=contacts.length;i++)
      {
        contacts[index].id -= 1;
      }
    }
    this.setState({viewForm : false, shouldDisplaySelectedContact : false});
  }

  home(event : any)
  {
    event.preventDefault();
    this.setState({viewForm : false, shouldDisplaySelectedContact : false, displayAllContacts : true});
  }

  onContactUpsert  = (newProps : any,id : number)=>
  {
    contacts = newProps;
    this.setState({displayAllContacts : true});
    if(id!==undefined) this.displayContact(id);
    else this.setState({viewForm : false, shouldDisplaySelectedContact : false});
  }

  displayContact=(id : number)=>
  {
    this.setState({viewForm : false, shouldDisplaySelectedContact : true});
    this.selectedId = id;
  }

  render()
  {
    return(
          <div className="pageContent">
            <div className="mainHeading">
                Address Book
            </div>

            <div className="horizontalNavigationBar">
                <ul>
                    <li><a onClick={this.home} >Home</a></li>
                    <li><a onClick={this.addContact}>+Add</a></li>
                    <li><img src={blogIcon} alt="bing-logo"/></li>
                </ul>
            </div>

            {this.state.displayAllContacts ? <ContactsList contacts = {contacts} displayContact={this.displayContact} /> : ''}
            {this.state.shouldDisplaySelectedContact ? 
            <DisplaySelectedContact contact={contacts.find((obj: { id: number; })=>obj.id===this.selectedId)} editContact={this.editContact} deleteContact={this.deleteContact} /> : ''}
            <div>
              {this.state.viewForm ? this.actionSelected : ''}
            </div>
            </div>
    );
  }
}

export default Home;
