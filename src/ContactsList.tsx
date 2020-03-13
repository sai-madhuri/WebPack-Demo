import { Contact } from "./Contact";
import React from "react";

class ContactsList extends React.Component<any,any>{
    
  constructor(props : any)
  {
    super(props);
    this.state = { active : -1};
  }

  displayContact(id : number)
  {
    this.setState({active : id});
    this.props.displayContact(id);
  }

    listItems : any = []
    
    render(){
      this.listItems = this.props.contacts.map((contact : { contact : Contact; id : number, name : string, email : string, mobile : string}) => 
        (
         <div>
           <li onClick={()=> this.displayContact(contact.id)} className = {this.state.active===contact.id ? "highLight" : ""}  key={contact.name}>
             <p className='name'>{contact.name}</p>
             <p>{contact.email}</p>
             <p>{contact.mobile}</p>
           </li>
         </div>
       )
     )
    return(
      <div className="contactList">
          <p className="contactHeading">CONTACTS</p>
            <ul>
              {this.listItems}
            </ul>
      </div>
    );
  }
  }

  export default ContactsList;