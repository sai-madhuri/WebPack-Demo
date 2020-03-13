import React from 'react';
import editIcon from './assets/Edit-icon.png';
import deleteIcon from './assets/delete-icon.png';

function DisplaySelectedContact(props : any) //extends React.Component<any,any>
{
    return(
    <div id="contactInformation">
      <div className="displaySelectedContact">
         <p>{props.contact.name}</p>
         <img className="icons" src={editIcon} alt="edit-icon"/><button id="editContact" onClick={()=>props.editContact(props.contact)}>Edit</button>
         <img className="icons" src={deleteIcon} alt="delete-icon"/><button id="deleteContact" onClick={()=>props.deleteContact(props.contact)}>Delete</button>
     </div>
     <div className="displayEmail">
         <p>Email :  {props.contact.email}</p>
     </div>
     <div className="contactDetails">
         <div className="mobile"><p>Mobile : {props.contact.mobile}</p></div>
         <div className="landline"><p>Landline :  {props.contact.landLine}</p></div>
     </div>
     <div className="website">
         <p>Website :{props.contact.website}</p>
     </div>
     <div className="Address">
         <div className="address">Address : <pre>{props.contact.address}</pre></div>
     </div>
    </div>
  );
}

export default DisplaySelectedContact;