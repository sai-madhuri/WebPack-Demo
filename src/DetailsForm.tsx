import React from 'react';
import {Contact} from './Contact';
import Home from './App.js';

class DetailsForm extends React.Component<any,any>{
  action: string;
  nextPage: null;
  newContact: Contact;

    constructor(props : any)
    {
      super(props);
      if(this.props.contact!==undefined)
      {
        this.state = {
          viewForm : true,
          name : this.props.contact.name,
          email : this.props.contact.email,
          mobile : this.props.contact.mobile,
          landLine : this.props.contact.landLine,
          website : this.props.contact.website,
          address : this.props.contact.address,
          errors :{
            name : '',
            mobile : '',
            email : ''
          },
          isFormValid : true,
          validationMessage : ""
        };
        this.action = "Update";
      }

      else{
      this.state={viewForm : true, name : '', email : '' , mobile : '', 
        landLine : '' , address : '' ,website :'', errors :{
          name : '*',
          mobile : '*',
          email : '*'
        },
        isFormValid : false,
        validationMessage : ""
      };
        this.action = "Add";
      }

      this.submitDetails = this.submitDetails.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.nextPage = null;
      this.newContact = this.props.contact;
    }


    validate(fieldName : string ,fieldValue : string)
    {
      const name = fieldName, value = fieldValue;
      let errors = this.state.errors;
  
      switch (name) {
        case 'name': 
          var regex = /^([a-zA-Z ]{2})+([a-zA-Z ])*$/;
          errors.name = regex.test(value) ? '' : 'Please enter a valid name';
          break;
        case 'email': 
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
          errors.email = 
            regex.test(value)
              ? ''
              : 'Email is not valid';
          break;
        case 'mobile':  var regex = /^(?:(?:\+)91(\s*[\ -]\s*)?)?(\d[ -]?){9}\d$/;
          errors.mobile = regex.test(value) ? '' : 'Please enter a valid mobile number';
          if(value.length<10) errors.mobile = "Mobile number cannot be less than 10 digits";
          if(value.length==0) errors.mobile = "Mobile number cannot be empty";
          break;
        default:
          break;
      }
  
      this.setState({errors, [name]: value});
    }
  
    validateForm(errors : any)
    {
        let count = 0;
       
        Object.values(errors).forEach((value : any)  => {
          if(value.length > 0)  count+=1;
        });

        if(count > 0)
        {
          this.setState({isFormValid : false , validationMessage : "* Please fill the required fields with valid data"});
          return false;
        }
        else this.setState({isFormValid : true, validationMessage : ""});
        return true;
  }

    submitDetails()
    {
      if(this.validateForm(this.state.errors)){
      var contact = new Contact(1,this.state.email,this.state.name,this.state.mobile,this.state.landLine,this.state.website,this.state.address);
      if(this.props.contact===undefined){
        contact.id = this.props.contacts.length+1;
        contact.address = this.state.address.replace(/(?:(?:\n)\s*){2}/gm, "\n");
        this.props.contacts.push(contact);
    }
    else{
      var index = this.props.contacts.findIndex((obj: { id: any; })=>obj.id==this.props.contact.id);
      contact.id = this.props.contact.id;
      contact.address = this.state.address.replace(/(?:(?:\n)\s*){2}/gm, "\n");
      this.props.contacts[index]=contact;
    }
      const onContactUpsert = this.props.onContactUpsert;
      onContactUpsert(this.props.contacts,contact.id);
  } 
  }
  
    handleChange(event : any) {
      const target = event.target;
      const fieldName =target.name;
      this.setState({[fieldName] : event.target.value});
      this.validate(fieldName,event.target.value);
    }

    render(){
      const errors = this.state.errors;
      return (
      <div id="addContactForm" className="detailsForm">
        <form id="addContactDetails">
          <div className="error">{this.state.validationMessage}</div>
          <label>Name {errors.name.length > 0 ?
                <span className='error'>{errors.name}</span> : "*"}</label><br/>

          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required/><br/>
          <label>Email {errors.email.length > 0 ? 
                <span className='error'>{errors.email}</span> : "*"}
          </label><br/>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required/><br/>
          <div className="table">
              <span className="box">
                  <label>Mobile {errors.mobile.length > 0 ? 
                <span className='error'>{errors.mobile}</span> : "*"}</label>
                  <br/>
              </span>
              <span>
                  <label>Landline</label>
              </span>
          </div>
          <span className="box">
              <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} required/>
          </span>
          <span className="box">
              <input type="text" name="landLine" value={this.state.landLine} onChange={this.handleChange} />
          </span><br/>
          <label>Website</label><br/>
          <input type="text" name="website" value={this.state.website} onChange={this.handleChange} /><br/>
          <label>Address</label><br/>
          <textarea name="address" value={this.state.address} onChange={this.handleChange}></textarea><br/><br/>
           <input type="button" className="submitDetailsButton" onClick={this.submitDetails} value={this.action}/> 
          
        </form>
    </div>
    );
  }
    }


  export default DetailsForm;